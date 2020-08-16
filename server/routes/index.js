const express = require('express');
const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const router = express.Router();
const salt = 10;


router.post("/auth/registration", async (req, res, next) => {
    const {userEmail, password, userName, phone} = req.body;
    try {
        let newUser = new UserModel({
            userEmail,
            password: await bcrypt.hash(password, salt),
            userName,
            phone,
        });
        await newUser.save();
        req.session.user = newUser;
        return res.status(200).json({message: "Successful registration", resultCode: 0});
    } catch (error) {
        if (error.message.includes("E11000")) {
            return res.status(401).json({message: "Not Acceptable", resultCode: 10});
        }
        res.status(200).json({resultCode: 10});
    }
});

router.post("/auth/login", async (req, res) => {
    const {userEmail, password} = req.body;
    let user = await UserModel.findOne({userEmail});
    if (!user) {
        return res.json({message: "Not Acceptable", resultCode: 10});
    }
    if (await bcrypt.compare(password, user.password)) {
        req.session.user = user;
        res.json({message: "Successful login", resultCode: 0});
    } else {
        return res.status(401).json({message: "Not Acceptable", resultCode: 10});
    }

});

router.delete("/auth/login", async (req, res, next) => {
    if (req.session.user) {
        try {
            await req.session.destroy();
            res.clearCookie("user_sid");
            res.json({resultCode: 0});
        } catch (error) {
            next(error);
        }
    } else {
        res.json({resultCode: 10});
    }
});

router.get("/auth/me", async (req, res, next) => {
    if (req.session.user) {
        const user = await UserModel.findOne({_id: req.session.user._id});
        const {_id, userEmail, userName, files} = user;
        res.status(200).json({
            _id,
            userEmail,
            userName,
            files,
            resultCode: 0,
        })
    } else {
        res.json({message: "You are not authenticated", resultCode: 10});
    }
});

module.exports = router;

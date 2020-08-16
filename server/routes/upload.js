const express = require('express');
const fs = require('fs');
const router = express.Router();
const UserModel = require('../models/user');
const {v4} = require('uuid');

router.post('/', async (req, res) => {
    // if (req.file.mimetype.includes('image')) {
    //     fs.readFile(req.file.path, (err, data) => {
    //         const imageUpload = storage.ref(`images/${req.file.originalname}`).put(data);
    //         imageUpload.on(
    //             'state_changed',
    //             (snapshot) => {
    //                 console.log(snapshot);
    //             },
    //             (error) => {
    //                 console.log(error);
    //             },
    //             () => {
    //                 storage.ref('images')
    //                     .child(req.file.originalname)
    //                     .getDownloadURL()
    //                     .then(async (url) => {
    //                         const user = await UserModel.findOne({_id: req.headers.userid});
    //                         const file = {...req.file, url}
    //                         user.files.push(file);
    //                         res.json({message: "Image file uploaded to server firebase storage and db!"});
    //                     })
    //             }
    //         )
    //     });
    try {
        const user = await UserModel.findOne({_id: req.headers.userid});
        // user.images.push({data: fs.readFileSync(req.file.path), contentType: req.file.mimetype});
        if (req.headers.isalreadycreated) {
            return res.status(200).json({message: "file is already exist in your storage directory"});
        }
        const file = {...req.file, id: v4()}
        user.files.push(file);
        await user.save();
        res.status(200).json({message: "File uploaded to server and db!", user});
    } catch (error) {
        res.status(401);
    }
})

router.patch('/file/:fileId', async (req, res, next) => {
    const {fileId} = req.params;
    const {oldFileName, newFileName, userId} = req.body;
    try {
        await fs.promises.rename(__dirname + `/../public/uploads/${userId}/${oldFileName}`, __dirname + `/../public/uploads/${userId}/${newFileName}`);
        await UserModel.findOneAndUpdate({_id: userId, files: {$elemMatch: {id: fileId}}}, {
            $set: {
                'files.$.originalname': newFileName
            }
        }, {'new': true, 'safe': true, 'upsert': true});
        res.status(200).json({msg: `file id: ${fileId} successfully been updated`});
    } catch (error) {
        res.status(401).json({msg: error.message})
    }
})

router.delete('/file/', async (req, res, next) => {
    const {fileId, fileName, userId} = req.query;
    try {
        await fs.promises.unlink(__dirname + `/../public/uploads/${userId}/${fileName}`);
        const user = await UserModel.findOneAndUpdate({_id: userId}, {$pull: {files: {"id": fileId}}});
        res.status(200).json({msg: `file id: ${fileId} successfully been deleted from database,`});
    } catch (error) {
        console.log(error.message, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>..');
        res.status(401).json({msg: 'file is not in database and storage'});
    }


})

module.exports = router;

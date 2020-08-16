const express = require('express');
const pino = require('express-pino-logger')();
const indexRouter = require('../server/routes/index')
const uploadRouter = require('../server/routes/upload')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const useErrorHandlers = require('./middleware/error');
const useLocals = require('./middleware/locals');
const expressFileUpload = require('express-fileupload');
const FileStore = require('session-file-store')(session);
const {cookiesCleaner} = require('./middleware/auth');
const multer = require('multer');
const app = express();


const fs = require('fs');

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        const isDirCreated = fs.readdirSync(__dirname + `/public/uploads/`)
            .find((folder) => folder === req.headers.userid);
        if (req.headers.userid && !isDirCreated) {
            fs.mkdirSync(__dirname + `/public/uploads/${req.headers.userid}`);
            cb(null, __dirname + `/public/uploads/${req.headers.userid}`);
        } else if (req.headers.userid && isDirCreated) {
            const isFileCreated = fs.readdirSync(__dirname + `/public/uploads/${req.headers.userid}`)
                .find((f) => f === file.originalname);
            if (isFileCreated) {
                req.headers.isalreadycreated = true;
                cb(null, __dirname + `/public/uploads/${req.headers.userid}`);
            } else {
                cb(null, __dirname + `/public/uploads/${req.headers.userid}`);
            }
        } else {
            cb(null, __dirname + `/public/uploads/`);
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

app.use(multer({storage: storage}).single('file'));

const dbUrl = "mongodb://localhost:27017/uploadFiles";

const db = mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

app.use(function (req, res, next) {
    const type = req.get('Content-Type');
    if (type === 'application/octet-stream') {
        req.rawBody = Buffer.from([])
        req.on('data', function (chunk) {
            req.rawBody = Buffer.concat([req.rawBody, chunk])
        });

        req.on('end', function () {
            next();
        });
    } else {
        return next();
    }

});

// app.use(busboy());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// app.use(BodyParser.raw({
//     inflate: true,
//     limit: '100mb',
//     type: 'multipart/form-data'
// }));


app.use(pino);
app.use(cookieParser());


app.use(
    session({
        store: new FileStore(),
        key: "user_sid",
        secret: "anything here",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 6000000,
        },
    })
);


app.use(expressFileUpload());
app.use(cookiesCleaner);
useLocals(app);

app.use('/public', express.static(__dirname + '/public'));

app.use('/api', indexRouter)
app.use('/api/upload', uploadRouter)

useErrorHandlers(app);

app.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
);

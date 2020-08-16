const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userEmail: {required: true, type: String, unique: true},
    password: {required: true, type: String},
    userName: String,
    phone: String,
    images: [{data: Buffer, contentType: String}],
    files: [Object],
});

module.exports = mongoose.model("users", userSchema);

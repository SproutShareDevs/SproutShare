const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    first_name: String,
    last_name: String,
    email_address: String,
    password: String,
    lang: String,
    zip_code: Number
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);


module.exports = User;
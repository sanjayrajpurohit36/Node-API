// app/models/user.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    surname: String,
    age: String,
    role: String,
    password: String
});

module.exports = mongoose.model('bitelit', userSchema);

// app/models/bear.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BearSchema = new Schema({
    name: String,
    surname: String,
    age: String,
    role: String,
    password: String
});

module.exports = mongoose.model('bitelit', BearSchema);
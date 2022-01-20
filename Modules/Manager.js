const mongoose = require('mongoose');
const Manager = mongoose.Schema({
    Nom:{type:String},
    Email:{type:String},
    Tel:{type:String},
    Password:{type:String},
    Ville:{type:String},
},{timestamps:true})
mongoose.model('Manager',Manager);

module.exports = mongoose.model('Manager',Manager);
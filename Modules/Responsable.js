const mongoose = require('mongoose');
const Responsable = mongoose.Schema({
    Nom:{type:String},
    Email:{type:String},
    Tel:{type:String},
    Password:{type:String},
    Ville:{type:String},
},{timestamps:true})
mongoose.model('Responsable',Responsable);

module.exports = mongoose.model('Responsable', Responsable);
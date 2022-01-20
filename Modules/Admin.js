const mongoose = require('mongoose');
const Admin = mongoose.Schema({
    Nom:{type:String},
    Email:{type:String,required:[true,"le champs Email Obligatoire"]},
    Tel:{type:String},
    Password:{type:String},
    Zone:{type:String},
},{timestamps:true})
mongoose.model('Admin',Admin);
module.exports = mongoose.model('Admin',Admin);
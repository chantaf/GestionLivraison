const mongoose = require('mongoose');
const Chauffeur = mongoose.Schema({
    Nom:{type:String},
    Email:{type:String},
    Tel:{type:String},
    Password:{type:String},
    Ville:{type:String},
    Salaire:{type:String},
    Vehicule:{type:mongoose.Schema.ObjectId,ref:'Vehicule'},
  
},{timestamps:true})
// mongoose.model('Chauffeur',Chauffeur);

module.exports = mongoose.model('Chauffeur', Chauffeur);
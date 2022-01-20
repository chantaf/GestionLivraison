const mongoose = require('mongoose');
const Vehicule = mongoose.Schema({
    Nom:{type:String},
    Categorie:{type:String},
    Matricule:{type:String},
},{timestamps:true})
mongoose.model('Vehicule',Vehicule);
  
module.exports = mongoose.model('Vehicule',Vehicule);
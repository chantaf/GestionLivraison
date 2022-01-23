const mongoose = require('mongoose');
const Journalisation = mongoose.Schema({
    Nom:{type:String},
    Poid:{type:String},
    Date:{type:Date},
    Villed:{type:String},
    Villea:{type:String},
    Vehicule:{type:String},
    Distance:{type:String},
    Status:{type:String},
    Chauffeur:{type:String}, 
},{timestamps:true})
// mongoose.model('Journalisation',Journalisation);

module.exports = mongoose.model('Journalisation', Journalisation);
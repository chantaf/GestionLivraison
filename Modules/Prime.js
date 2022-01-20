const mongoose = require('mongoose');
const { default: isFloat } = require('validator/lib/isFloat');
const Prime = mongoose.Schema({
    Mois:{type:String},
    Montant:{type:Boolean},
    Commande:{type:mongoose.Schema.Types.ObjectId,ref:'Commande'},
    Distance:{type:String},
    Livreur:{type:mongoose.Schema.Types.ObjectId,ref:'Chauffeur'},
},{timestamps:true})
mongoose.model('Prime',Prime);

module.exports = mongoose.model('Prime', Prime);
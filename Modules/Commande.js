const mongoose = require('mongoose');
const Commande = mongoose.Schema({
    Nom:{type:String},
    Zone:{type:String},
    VilleD:{type:String},
    VilleA:{type:String},
    Poid:{type:String},
    Distance:{type:String},
    Date:{type:Date},
    Prix:{type:String},
    Status:{type:String},
    Livreur:{type:mongoose.Schema.Types.ObjectId,ref:'Chauffeur'},
},{timestamps:true})
mongoose.model('Commande',Commande);

module.exports = mongoose.model('Commande', Commande);
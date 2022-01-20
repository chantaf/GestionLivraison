const CommandeSchema = require('../Modules/Commande')
const PrimeSchema = require('../Modules/Prime')
const nodemailer = require('nodemailer');
const Chauffeur = require('../Modules/Chauffeur')
const axios = require('axios')



//envoyer email
envoyeremail = (email)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'testcoding975@gmail.com',
          pass: 'testCoding1998'
        }
      });
      
      var mailOptions = {
        from: 'testcoding975@gmail.com',
        to: email,
        subject: 'livraison encoure ',
        text: 'bonjour voila la livraison encoure pour traiter cette livraison entre dans votre session'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}
module.exports={
    //Afficher tout les Commandes
    Get: async (req, res) => {
        try{
            const Commandes =await CommandeSchema.find()
            return res.status(200).json(Commandes)
        }catch(err){
            return res.status(400).json(err)
        }
    },
    //Afficher Commande par Id
    GetOne: async (req, res) => {
        try{
            const id = req.params.id
            const Commande =await CommandeSchema.find({_id:id})
            return res.status(200).json(Commande)
        }catch(err){
            console.log(err)
        }
    },
     //Afficher Commande par Status
     GetOne: async (req, res) => {
        try{
            const Status = req.params.Status
            const Commande =await CommandeSchema.find({Status:Status})
            return res.status(200).json(Commande)
        }catch(err){
            console.log(err)
        }
    },
    //Ajouter Commande
    Add: async (req, res) => {
    
    let Distance = await axios(`https://www.distance24.org/route.json?stops=${req.body.VilleD}%7C${req.body.VilleA}`)
    let Prix = req.body.poids * 40;
    if(req.body.Poid > 3){
        Prix =(40*3) + (req.body.poids - 3) * 5;
    }
   
        const Commande ={
            Nom:req.body.Nom,
            Zone:req.body.Zone,
            VilleD:req.body.VilleD,
            VilleA:req.body.VilleA,
            Poid:req.body.Poid,
            Distance:Distance.distance,
            Date:req.body.Date,
            Prix:Prix,
            Status:req.body.Status,
        }
        try{
            new CommandeSchema(Commande)
              .save()
              .then(async (Commande)=>{
                    //envoyer email
                    const Chauffeurs = await Chauffeur.find().populate("Vehicule");
                    Chauffeurs.forEach(element => {
                        if(element.Vehicule.Categorie == "Voiture" &&  (req.body.Poid>0 && req.body.Poid <= 200)){
                            envoyeremail(element.Email)
                        }else if(element.Vehicule.Categorie == "PetitCamio" && (req.body.Poid >= 200 && req.body.Poid <= 800)){
                            envoyeremail(element.Email)
                        }else if(element.Vehicule.Categorie == "GrandCamio" && (req.body.Poid >= 800 && req.body.Poid <= 1600)){
                            envoyeremail(element.Email)
                        }
                    })

                    return res.status(201).send({Commande})
                })
                .catch(err =>{
                    return res.status(400).send(err)
                })
        }catch(err){
                return res.status(400).send(err)
        }
    },

    //Modifier Commande
    Update: async (req, res) => {
        try{
            let Distance = await axios(`https://www.distance24.org/route.json?stops=${req.body.VilleD}%7C${req.body.VilleA}`)
            let Prix = req.body.poids * 40;
            if(req.body.Poid > 3){
                Prix =(40*3) + (req.body.poids - 3) * 5;
            }
            
            const id = req.params.id ;
            const updateData = {
              $set: {
                Nom:req.body.Nom,
                Zone:req.body.Zone,
                VilleD:req.body.VilleD,
                VilleA:req.body.VilleA,
                Poid:req.body.Poid,
                Distance:Distance.distance,
                Date:req.body.Date,
                Prix:Prix,
                Status:req.body.Status,
              },
            };
            await CommandeSchema.findByIdAndUpdate(id, updateData);
            return res.status(200).json("modifié avec succès")
        }catch(err){
            res.status(400).json(err)
        }
    },

    //Modifier Status Commande
    UpdateStatus: async (req, res) => {
        try{
            const id = req.params.id ;
            const updateData = {
              $set: {
                Status:req.body.Status,
              },
            };

            await CommandeSchema.findByIdAndUpdate(id, updateData);
            return res.status(200).json("Status modifié avec succès")
        }catch(err){
            res.status(400).json(err)
        }

    },

    //Valider Commande
    Updateaffecter: async (req, res) => {
        try{
            const id = req.params.id ;
            const updateData = {
              $set: {
                Status:req.body.Status,
                Livreur:req.body.Chauffeur,
              },
            };
            await CommandeSchema.findByIdAndUpdate(id, updateData);
            return res.status(200).json("Status modifié avec succès")
        }catch(err){
            res.status(400).json(err)
        }

           //Ajouter Prime
           const Commande =await CommandeSchema.find({_id:id})
           const Prime={
            Mois:new Date (Commande).getMonth(),
            Montant:Commande.Prix,
            Commande:id,
            Distance:Commande.Distance,
            Livreur:req.body.Chauffeur,
        }

        new PrimeSchema(Prime)
        .save()
        .then(async (Prime)=>{
              return res.status(201).send({Prime})
          })
          .catch(err =>{
              return res.status(400).send(err)
          })
    },
    //Supprimer Commande
    Delete: async (req, res) => {
        try{
            const id = req.params.id
            const Commande =await CommandeSchema.deleteOne({id:id})
            return res.status(200).json(Commande)
        }catch(err){
            return res.status(400).json(err)
        }
    },
}

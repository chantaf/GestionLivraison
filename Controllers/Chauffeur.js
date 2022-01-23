const ChauffeurSchema = require('../Modules/Chauffeur')
const Helper = require('../Helpers')
const Db = require('../Config')
module.exports={
    // ExistEmail: async (req,res)=>{
    //     const Email = await Helper.CheckExistEmail(req.body.Email)
    //     Email === 200 &&  res.status(200).send()
    //     Email === 404 &&  res.status(404).send()
    // },

    
    //Afficher tout Chauffeur
    Get: async (req, res) => {
        try{
            const Chauffeurs =await ChauffeurSchema.find().populate("Vehicule");
            return res.status(200).json(Chauffeurs)
        }catch(err){
            return res.status(400).json(err)
        }
    },

    //Afficher Chauffeur par Id
    GetOne: async (req, res) => {
        try{
            const id = req.params.id
            const Chauffeur =await ChauffeurSchema.find({id:id}).populate("Vehicule");
            return res.status(200).json(Chauffeur)
        }catch(err){
            console.log(err)
        }
    },
    //Ajouter Chauffeur
    Add: async (req, res) => {
        const HashPassword = await Helper.HashPassword(req.body.Password)
        const Chauffeur = {
            Nom:req.body.Nom,
            Email:req.body.Email,
            Tel:req.body.Tel,
            Password:HashPassword,
            Ville:req.body.Ville, 
            Salaire:req.body.Salaire, 
            Vehicule:req.body.Vehicule,
        }
       
        try {
            const Chauffeurs = await ChauffeurSchema.find({Vehicule: req.body.Vehicule}).populate("Vehicule");

            Chauffeurs.forEach(element => {
              if(element.Vehicule.id == req.body.Vehicule){
                res.status(201).json("vehicule Occupé");
              }else{
                new ChauffeurSchema(Chauffeur)
                .save()
                .then(async (Chauffeur)=>{
                    return res.status(201).send({Chauffeur})
                    
                })
              }
           
            });
          
          } catch (err) {
            res.status(404).json({ message: err.message });
          }
      
    },
    Update: async (req, res) => {
        try{
            const id = req.params.id ;
            const HashPassword = await Helper.HashPassword(req.body.Password)
            const updateDoc = {
              $set: {
                Nom:req.body.Nom,
                Email:req.body.Email,
                Tel:req.body.Tel,
                Password:HashPassword,
                Ville:req.body.Ville, 
                Vehicule:req.body.Vehicule,
              },
            };
            await ChauffeurSchema.findByIdAndUpdate(id,updateDoc);
            return res.status(200).json("modifié avec succès")
        }catch(err){
            res.status(400).json(err)
        }
    },
    Delete: async (req, res) => {
        try{
            const id = req.params.id
            const Chauffeur =await ChauffeurSchema.deleteOne({id:id})
            return res.status(200).json(Chauffeur)
        }catch(err){
            return res.status(400).json(err)
        }
    },
}




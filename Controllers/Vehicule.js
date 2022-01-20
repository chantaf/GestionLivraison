const VehiculeSchema = require('../Modules/Vehicule')

module.exports={
    GetOne: async (req, res) => {
        try{
            const Id = req.params.id
            const Vehicule =await VehiculeSchema.find({_id:Id})
            return res.status(200).json(Vehicule)
        }catch(err){
            return res.status(400).json(err)
        }
    },
    Get: async (req, res) => {
        try{
            const Vehicules =await VehiculeSchema.find()
            return res.status(200).json(Vehicules)
        }catch(err){
            return res.status(400).json(err)
        }
    },
    Add: async (req, res) => {
        const Data = {
            Nom:req.body.Nom,
            Categorie:req.body.Categorie,
            Matricule:req.body.Matricule
        }
        try{
            new VehiculeSchema(Data)
            .save()
            .then(async (Vehicule)=>{
                return res.status(201).send({Vehicule})
            })
            .catch(err =>{
                return res.status(400).send(err)
            })
        }catch(err){
                return res.status(400).send(err)
        }
    },

    Update: async (req, res) => {
        try{
            const id = req.params.id ;
            const updateData = {
              $set: {
                Nom:req.body.Nom,
                Categorie:req.body.Categorie,
                Matricule:req.body.Matricule
              },
            };
            await AdminSchema.findByIdAndUpdate(id, updateData);
            return res.status(200).json("modifié avec succès")
        }catch(err){
            res.status(400).json(err)
        }
    },

    Delete: async (req, res) => {
        try{
            const id = req.params.id
            const Admin =await AdminSchema.deleteOne({id:id})
            return res.status(200).json(Admin)
        }catch(err){
            return res.status(400).json(err)
        }
    },
}





const ResponsableSchema = require('../Modules/Responsable')
const Helper = require('../Helpers')
const Db = require('../Config')

module.exports={
    // ExistEmail: async (req,res)=>{
    //     const Email = await Helper.CheckExistEmail(req.body.Email)
    //     Email === 200 &&  res.status(200).send()
    //     Email === 404 &&  res.status(404).send()
    // },
    Get: async (req, res) => {
        try{
            const Responsables =await ResponsableSchema.find()
            return res.status(200).json(Responsables)
        }catch(err){
            return res.status(400).json(err)
        }
    },
    GetOne: async (req, res) => {
        try{
            const id = req.params.id
            const Responsable =await ResponsableSchema.find({_id:id})
            return res.status(200).json(Responsable)
        }catch(err){
            console.log(err)
        }
    },
    Add: async (req, res) => {
        const HashPassword = await Helper.HashPassword(req.body.Password)
        const Responsable = {
            Nom:req.body.Nom,
            Email:req.body.Email,
            Tel:req.body.Tel,
            Password:HashPassword,
            Ville:req.body.Ville, 
        }
        try{
            new ResponsableSchema(Responsable)
                .save()
                .then(async (Responsable)=>{
                    return res.status(201).send({Responsable})
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
                Email:req.body.Email,
                Tel:req.body.Tel,
                Password:HashPassword,
                Ville:req.body.Ville,
              },
            };
            await ResponsableSchema.findByIdAndUpdate(id, updateData);
            return res.status(200).json("modifié avec succès")
        }catch(err){
            res.status(400).json(err)
        }
    },
    Delete: async (req, res) => {
        try{
            const id = req.params.id
            const Responsable =await ResponsableSchema.deleteOne({id:id})
            return res.status(200).json(Responsable)
        }catch(err){
            return res.status(400).json(err)
        }
    },
}




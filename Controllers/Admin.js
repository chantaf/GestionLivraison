const AdminSchema = require('../Modules/Admin')
const Helper = require('../Helpers')
const Db = require('../Config')

module.exports={
    // ExistEmail: async (req,res)=>{
    //     const Email = await Helper.CheckExistEmail(req.body.Email,AdminSchema)
    //     Email === 200 &&  res.status(200).send()
    //     Email === 404 &&  res.status(404).send()
    // },

    //Afficher tout Admin
    Get: async (req, res) => {
        try{
            const Admins =await AdminSchema.find()
            return res.status(200).json(Admins)
        }catch(err){
            return res.status(400).json(err)
        }
    },
 //Afficher Admin par Id
    GetOne: async (req, res) => {
        try{
            const id = req.params.id
            const Admin =await AdminSchema.find({_id:id})
            return res.status(200).json(Admin)
        }catch(err){
            console.log(err)
        }
    },
    //Ajouter Admin
    Add: async (req, res) => {
        const HashPassword = await Helper.HashPassword(req.body.Password)
        const Admin = {
            Nom:req.body.Nom,
            Email:req.body.Email,
            Tel:req.body.Tel,
            Password:HashPassword,
            Zone:req.body.Zone, 
        }
        try{
            new AdminSchema(Admin)
                .save()
                .then(async (Admin)=>{
                    return res.status(201).send({Admin})
                })
                .catch(err =>{
                    return res.status(400).send(err)
                })
        }catch(err){
                return res.status(400).send(err)
        }
    },
    //Modifier Admin
    Update: async (req, res) => {
        try{
            const id = req.params.id ;
            const updateData = {
              $set: {
                Nom:req.body.Nom,
                Email:req.body.Email,
                Tel:req.body.Tel,
                Password:HashPassword,
                Zone:req.body.Zone,
              },
            };
            await AdminSchema.findByIdAndUpdate(id,updateData);
            return res.status(200).json("modifié avec succès")
        }catch(err){
            res.status(400).json(err)
        }
    },
    //Supprimer Admin
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




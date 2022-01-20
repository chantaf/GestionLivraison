const ManagerSchema = require('../Modules/Manager')
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
            const Managers =await ManagerSchema.find()
            return res.status(200).json(Managers)
        }catch(err){
            return res.status(400).json(err)
        }
    },
    GetOne: async (req, res) => {
        try{
            const id = req.params.id
            const Manager =await ManagerSchema.find({_id:id})
            return res.status(200).json(Manager)
        }catch(err){
            console.log(err)
        }
    },
    Add: async (req, res) => {
        const HashPassword = await Helper.HashPassword(req.body.Password)
        const Manager = {
            Nom:req.body.Nom,
            Email:req.body.Email,
            Tel:req.body.Tel,
            Password:HashPassword,
            Ville:req.body.Ville, 
        }
        try{
            new ManagerSchema(Manager)
                .save()
                .then(async (Manager)=>{
                    return res.status(201).send({Manager})
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
            await ManagerSchema.findByIdAndUpdate(id, updateData);
            return res.status(200).json("modifié avec succès")
        }catch(err){
            res.status(400).json(err)
        }
    },
    Delete: async (req, res) => {
        try{
            const id = req.params.id
            const Manager =await ManagerSchema.deleteOne({id:id})
            return res.status(200).json(Manager)
        }catch(err){
            return res.status(400).json(err)
        }
    },
}




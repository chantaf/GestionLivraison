const JournalisationSchema = require('../Modules/Journalisation')

module.exports={
    Get: async (req, res) => {
        try{
            const Journalisations =await JournalisationSchema.find()
            return res.status(200).json(Journalisations)
        }catch(err){
            return res.status(400).json(err)
        }
    },
    GetOne: async (req, res) => {
        try{
            const id = req.params.id
            const Journalisation =await JournalisationSchema.find({_id:id})
            return res.status(200).json(Journalisation)
        }catch(err){
            console.log(err)
        }
    },
    Add: async (req, res) => {
        const Journalisation = {
            Nom:req.body.Nom,
            Poid:req.body.Poid,
            Date:req.body.Date,
            VilleD:req.body.VilleD,
            VilleA:req.body.VilleA,
            Vehicule:req.body.Vehicule,
            Distance:req.body.Distance,
            Status:req.body.Status,
            Chauffeur:"",
        }
        try{
            new JournalisationSchema(Journalisation)
                .save()
                .then(async (Journalisation)=>{
                    const token = await Helper.CreateJwt(Journalisation._id,86400)
                    return res.status(201).send({token})
                })
                .catch(err =>{
                    return res.status(400).send(err)
                })
        }catch(err){
                return res.status(400).send(err)
        }
    },
}
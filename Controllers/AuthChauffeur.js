const ChauffeurSchema = require('../Modules/Chauffeur')
const Helper = require('../Helpers')
const bcrypt = require('bcrypt');
const Db = require('../Config')

module.exports={
     //Login
    Login: async (req, res) => {
        const Chauffeur = await ChauffeurSchema.findOne({ Email: req.body.Email}).exec();
        Chauffeur === null  && res.status(403).send({Message:'Email Not Found'})

        bcrypt.compare(req.body.Password, Chauffeur.Password).then(async (validPass) => {
            !validPass &&  res.status(200).send({Message : 'Password Incorrect'})
            
            
            const Role="Chauffeur"
            const token = await Helper.CreateJwt(Chauffeur._id,"1h")
            const Reponse={token,Role}
            return res.status(201).send({Reponse})
          
           
        }).catch(err => res.status(400).send({Message : err}));
    },
    
    //Logout
    Logout: async (req, res) => {
        res.status(201).send({Message : "logout"})
    }
}
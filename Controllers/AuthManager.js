const ManagerSchema = require('../Modules/Manager')
const Helper = require('../Helpers')
const bcrypt = require('bcrypt');
const Db = require('../Config')

module.exports={
     //Login
    Login: async (req, res) => {
        const Manager = await ManagerSchema.findOne({ Email: req.body.Email}).exec();
        Manager === null  && res.status(403).send({Message:'Email Not Found'})

        bcrypt.compare(req.body.Password, Manager.Password).then(async (validPass) => {
            !validPass &&  res.status(200).send({Message : 'Password Incorrect'})
            
            const token = await Helper.CreateJwt(Manager._id,"1h")
            return res.status(201).send({token})
        }).catch(err => res.status(400).send({Message : err}));
    },

    //Logout
    Logout: async (req, res) => {
        res.status(201).send({Message : "logout"})
    }
}
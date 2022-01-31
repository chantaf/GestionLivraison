const AdminSchema = require('../Modules/Admin')
const Helper = require('../Helpers')
const bcrypt = require('bcrypt');
const Db = require('../Config')

module.exports={
    //Login
    Login: async (req, res) => {
        const Admin = await AdminSchema.findOne({ Email: req.body.Email}).exec();
        Admin === null  && res.status(403).send({Message:'Email Not Found'})

        bcrypt.compare(req.body.Password, Admin.Password).then(async (validPass) => {
            !validPass &&  res.status(200).send({Message : 'Password Incorrect'})
            
            const Role="Admin"
            const token = await Helper.CreateJwt(Admin._id,"1h")
            const Reponse={token,Role}
            return res.status(201).send({Reponse})
        }).catch(err => res.status(400).send({Message : err}));
    },
  //Logout
    Logout: async (req, res) => {
        res.status(201).send({Message : "logout"})
    }
}


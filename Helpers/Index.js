const validator = require('validator');
// const AdminSchema = require('../Modules/Admin')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports={
    // CheckExistEmail : async (Email,role) =>{
    //     return role.findOne({Email}, {})
    //     .then(result => {
    //         if(result) return  200;
    //         else  return  404
    //     })
    //     .catch(err => {return err});
    // },

    CreateJwt : async(id,Expiration) =>{
        const token = await jwt.sign(
            { id: id},
            "CHANTAFBADR",
            {
              expiresIn: Expiration,
            }
          );
          return token;
    },
    HashPassword : async(Password) =>{
          const salt = await bcrypt.genSalt(10);
          return await bcrypt.hash(Password, salt);
    },
}
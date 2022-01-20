const mongoose = require('mongoose');
const Connect = async () =>{
    try{
        const uri ='mongodb+srv://root:root123@cluster0.qjcjy.mongodb.net/LIVRAISON?retryWrites=true&w=majority';
        await mongoose.connect(uri,
            {
                useNewUrlParser: true,
            });
        console.log('connected to mongodb Gestion livraison')
    }catch(err){
        console.log(err)
    }
}
Connect();

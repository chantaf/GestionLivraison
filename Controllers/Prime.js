const PrimeSchema = require('../Modules/Prime')
const Commande = require('../Modules/Commande')
 
const GetCommande=Commande.Get;

module.exports={

    //Afficher  Primer Par Id
    GetOne: async (req, res) => {
        try{
            const id = req.params.id
            const Prime =await PrimeSchema.find({id:id})
            return res.status(200).json(Prime)
        }catch(err){
            console.log(err)
        }
    },


    //Afficher Les Primers
    Get: async (req, res) => {
        try{
            const Primes =await PrimeSchema.find()
            return res.status(200).json(Primes)
        }catch(err){
            return res.status(400).json(err)
        }
    },

      //Calcule Prime Par Mois
      CalculePrime: async (Mois) => {
        try{
            const Primes =await PrimeSchema.find(Mois)
            const Montant=0;
            const MontantPrime=0;
            const Distance=0;
            Primes.forEach(element => {
                if(element.Livreur==req.body.Livreur){
                    Montant+=element.Montant
                    Distance+=element.Distance
                }
            });

            if(Distance>=1000 && Distance<2000){
                MontantPrime=Montant*0,15
            }else if(Distance>=2000 && Distance<2500){
                MontantPrime=Montant*0,22
            }else{
                MontantPrime=Montant*0,30
            }
            return MontantPrime
        }catch(err){
            return err
        }
    },

    //Afficher Les Primers Par Livreur
    GetpLivreur: async (req, res) => {
        try{
            const Livreur = req.params.Livreur
            const Mois=req.body.Mois;
            const Primes =await PrimeSchema.find({Livreur:Livreur})
            const PrimeTotal=await CalculePrime(Mois);
            return res.status(200).json(Primes,PrimeTotal)
        }catch(err){
            return res.status(400).json(err)
        }
    },


    
}




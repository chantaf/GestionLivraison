const express = require('express')
const router = express.Router()
const Commande = require('../Controllers/Commande')
const morgan=require('morgan')

router.get('/',Commande.Get)
router.get('/:id',Commande.GetOne)
router.post('/',Commande.Add)
router.put('/:id',Commande.Update)
router.put('UpdateStatus/:id',Commande.UpdateStatus)
router.put('Affecter/:id',morgan(),Commande.Updateaffecter)
router.delete('/:id',Commande.Delete)

module.exports = router
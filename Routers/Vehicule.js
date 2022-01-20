const express = require('express')
const router = express.Router()
const Vehicule = require('../Controllers/Vehicule')

router.get('/',Vehicule.Get)
router.get('/:id',Vehicule.GetOne)
router.post('/',Vehicule.Add)
router.put('/:id',Vehicule.Update)
router.delete('/:id',Vehicule.Delete)

module.exports = router
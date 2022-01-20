const express = require('express')
const router = express.Router()
const Prime = require('../Controllers/Prime')

router.get('/',Prime.Get)
router.get('/:id',Prime.GetOne)
router.get('/CalculePrime',Prime.CalculePrime)
router.put('/:id',Vehicule.Update)
router.delete('/:id',Vehicule.Delete)

module.exports = router
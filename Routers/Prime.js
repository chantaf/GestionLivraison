const express = require('express')
const router = express.Router()
const Prime = require('../Controllers/Prime')

router.get('/',Prime.Get)
router.get('/:id',Prime.GetOne)
router.get('/:livreur',Prime.GetpLivreur)


module.exports = router
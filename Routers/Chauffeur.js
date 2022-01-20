const express = require('express')
const router = express.Router()
const Chauffeur = require('../Controllers/Chauffeur')

router.get('/',Chauffeur.Get)
router.get('/:id',Chauffeur.GetOne)
router.post('/',Chauffeur.Add)
// router.post('/CheckEmail',Chauffeur.ExistEmail)
router.put('/:id',Chauffeur.Update)
router.delete('/:id',Chauffeur.Delete)

module.exports = router
const express = require('express')
const router = express.Router()
const Responsable = require('../Controllers/Responsable')

router.get('/',Responsable.Get)
router.get('/:id',Responsable.GetOne)
router.post('/',Responsable.Add)
// router.post('/CheckEmail',Responsable.ExistEmail)
router.put('/:id',Responsable.Update)
router.delete('/:id',Responsable.Delete)

module.exports = router
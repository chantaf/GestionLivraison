const express = require('express')
const router = express.Router()
const Manager = require('../Controllers/Manager')

router.get('/',Manager.Get)
router.get('/:id',Manager.GetOne)
router.post('/',Manager.Add)
// router.post('/CheckEmail',Manager.ExistEmail)
router.put('/:id',Manager.Update)
router.delete('/:id',Manager.Delete)

module.exports = router
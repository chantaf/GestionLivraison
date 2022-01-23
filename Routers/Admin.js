const express = require('express')
const router = express.Router()
const Admin = require('../Controllers/Admin')
const morgan=require('morgan')
const fs=require("fs");

router.get('/',morgan('common', {stream: fs.createWriteStream('./admin.log', {flags: 'a'})}),Admin.Get)
router.get('/:id',Admin.GetOne)
router.post('/',Admin.Add)
// router.post('/CheckEmail',Admin.ExistEmail)
router.put('/:id',Admin.Update)
router.delete('/:id',Admin.Delete)

module.exports = router
const express = require('express')
const controllers = require('../controllers/views.controller')

const router = new express.Router()

router.get('/', controllers.login)
router.get('/index', controllers.index)

module.exports = router
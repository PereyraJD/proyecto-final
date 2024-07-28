const express = require('express')
const controllers = require('../controllers/user.controllers')

const router = new express.Router()

router.post('/register', controllers.registerUser)

router.post('/login', controllers.userLogin)



module.exports = router
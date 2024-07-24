const express = require('express')
const controllers = require('../controllers/api.controllers')

const router = new express.Router()



router.get('/', controllers.getMovies)

router.get('/:id', controllers.getMoviesById)




module.exports = router
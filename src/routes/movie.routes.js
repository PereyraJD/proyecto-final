const express = require('express')
const controllers = require('../controllers/api.controllers')

const router = new express.Router()


router.post('/', controllers.postMovies)

router.get('/', controllers.getMovies)
router.get('/:id', controllers.getMoviesById)

router.patch('/:id', controllers.patchMovies)
router.delete('/:id', controllers.deleteMovie)




module.exports = router
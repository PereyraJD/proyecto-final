const ModelMovies = require('../models/movie.model')
const controllers = {}




controllers.getMovies = async (req, res) => {
    
    let movies = []

    try {
        movies = await ModelMovies.find({})
        res.send(movies)
    } catch(error) {
        res.status(500).send(error)
    }
}

controllers.getMoviesById = async (req, res) => {

    const _id = req.params.id

    try {
        const movie = await ModelMovies.findOne( { _id } )

        if(!movie) {
            return res.status(404).send({msg: 'Pelicula no encontrada' })
        }

        res.send(movie)
        } catch(error) {
            res.status(500).send(error)
        }
}

module.exports = controllers
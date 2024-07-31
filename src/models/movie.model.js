const mongoose = require("mongoose");

const moviesSchema = new mongoose.Schema({
  categoria: {
    type: String,
    trim: true,
    required: true,
  },
  titulo: {
    type: String,
    trim: true,
    required: true,
  },
  sinopsis: {
    type: String,
    trim: true,
    required: true,
  },
  genero: {
    type: String,
    trim: true,
    required: true,
  },
  duracion: {
    type: String,
    trim: true,
    required: true,
  },
  clasificacion_por_edad: {
    type: String,
    trim: true,
    required: true,
  },
  elenco: {
    type: [String],
    trim: true,
    required: true,
  },
  director: {
    type: String,
    trim: true,
    required: true,
  },
  año_de_lanzamiento: {
    type: String,
    trim: true,
    required: true,
  },
  trailer: {
    type: String,
    trim: true,
    required: true,
  },
  portada: {
    type: String,
    trim: true,
    required: true,
  },
  banner: {
    type: String,
    trim: true,
    required: true,  
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

const ModelMovies = mongoose.model('movies', moviesSchema);

module.exports = ModelMovies;

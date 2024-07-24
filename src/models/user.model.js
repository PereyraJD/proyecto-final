const mongoose = require('mongoose')
const validator = require('validator')
const { validate } = require('./movie.model')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)) {
                throw new Error('Email Incorrecto!')
            }
        },
    },
    password: {
        type: String,
        require: true,
        trim: true,
        minlength: [8, 'Se requiere al menos 8 caracteres'],
        validate(value) {
            if(value.includes('12345678')) {
                throw new Error('Passaword no cumple las politicas de seguridad especificadas')
            }
        }
    },
})

const User = mongoose.model('user', userSchema)

module.exports = User
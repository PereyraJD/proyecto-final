const User = require('../models/user.model')
const controllers = {}


controllers.registerUser = async (req, res) => {
    const user = new User(req.body)

    try{
        await user.save()
        res.status(201).send(user)
    } catch(error) {
        res.status(500).send(error)
    }
}

controllers.userLogin = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateToken()

        res.status(200).send( { user, token } )
    }
    catch(error) {
        console.log('Error en el login:', error.message)
        res.status(400).send({ message: 'Error de Incio de Sesión'})
    }
}


module.exports = controllers
const express = require('express')
const cors = require('cors')
const routerMovies = require('./routes/movie.routes')
const userRouter = require('./routes/user.routes') 
require('./db/dbconnection')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/movies', routerMovies)
app.use('/users', userRouter)

app.listen(3000, ()=>{
    console.log(`server running en http://localhost:3000`)
})


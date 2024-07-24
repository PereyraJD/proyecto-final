const express = require('express')
require('./db/dbconnection')
const routerMovies = require('./routes/movie.routes') 
const app = express()

app.use(express.json())

app.use('/movies', routerMovies)
app.listen(3000, ()=>{
    console.log(`server running en http://localhost:3000`)
})


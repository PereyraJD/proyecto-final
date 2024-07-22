const express = require('express')
require('./db/dbconnection')
const app = express()

app.use(express.json())

app.listen(3000, ()=>{
    console.log(`server running en http://localhost:3000`)
})


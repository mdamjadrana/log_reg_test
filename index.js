const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userRoute = require('./api/routes/user')
//DB connection
mongoose.connect('mongodb://localhost:27017/studentDB', {useNewUrlParser: true})


//Body parser
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//user routes
app.use('/api/users', userRoute)


//Listen
app.listen('3000', () => console.log('runing'))


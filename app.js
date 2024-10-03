require('dotenv').config()

const express = require('express')
const userRoute = require('./routes/user.route.js')
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/v1', userRoute)

module.exports = app;
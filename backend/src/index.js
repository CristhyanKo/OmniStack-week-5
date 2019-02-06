const express = require('express')
const mongoose = require('mongoose')
const routes = require

const port = 3000
const app = express()

mongoose.connect('mongodb://localhost:27017/goweek-backend', {
    useNewUrlParser: true
})

app.use(require('./routes'))

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
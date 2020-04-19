const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const myRouter = require('./myrouter/router.js')
require('dotenv/config')

const app = express()

app.use(bodyParser.json())
app.use('/posts', myRouter)

// DB config
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to Atlas my friend")
});

app.listen('3000', () => {
    console.log("Server listening on port 3000")
})
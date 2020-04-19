const mongoose = require('mongoose')

const mySchema = mongoose.Schema({
    carBrand:  String,
    carModel:  String
})

const myModel = mongoose.model('cars', mySchema)

module.exports = myModel
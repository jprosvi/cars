const mongoose = require('mongoose')
const express = require('express')
const myRouter = express.Router()
const myModel = require('../mymodel/mymodel')

myRouter.get('/', (req, res) => {
    myModel.find((error, data) => {
         if(error) res.status(500).send(error)
         if(data && (data != '')) {
             res.json(data)
         } else {
             res.send("Data not found!")
         }
    })
 })

myRouter.post('/', (req, res) => {
    const cars = new myModel({
        carBrand:  req.body.carBrand,
        carModel: req.body.carModel
    })
    cars.save()
    res.json(cars)
})

myRouter.put('/:id', (req, res) => {
    myModel.findByIdAndUpdate(req.params.id, { $set: req.body} ,(error, data) => {
        if(data) {
            myModel.findById(req.params.id, (error, dataPerId) => {
                res.json(dataPerId)
            })
        } else {
            res.send(`ID: ${req.params.id} not found!`)
        }
    })
})

// Delete an entry
myRouter.delete('/:id', (req, res) => {
    myModel.findByIdAndDelete(req.params.id, (error, data) => {
        if(data && (data != '')) {
            res.send(`ID: ${req.params.id} deleted`)
        } else {
            res.send(`ID: ${req.params.id} not found!`)
        }

    })
})

myRouter.get('/:id', (req, res) => {
    myModel.findById(req.params.id, (error, data) => {
       if(data && (data != '')) {
           res.json(data)
           console.log(data)
       } else {
           res.send(`ID not found!: \"${req.params.id}\"`)
       }
    })
})



module.exports = myRouter
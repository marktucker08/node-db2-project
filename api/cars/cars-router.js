// DO YOUR MAGIC
const express = require('express');
const Cars = require('./cars-model');
const { 
    checkCarId, 
    checkCarPayload, 
    checkVinNumberValid, 
    checkVinNumberUnique 
} = require('./cars-middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
    Cars.getAll()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(next)
})

router.get('/:id', checkCarId, (req, res, next) => {
    res.status(200).json(req.car)
})

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, (req, res, next) => {
    Cars.create(req.body)
    .then(newCar => {
        res.status(201).json(newCar)
    })
    .catch(next)
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({ 
        message: err.message,
        stack: err.stack
    })
})

module.exports = router;
// DO YOUR MAGIC
const express = require('express');
const Cars = require('./cars-model');

const router = express.Router();

router.get('/', (req, res, next) => {
    Cars.getAll()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(next)
})

router.use((err, req, res, next) => {
    res.status(500).json({ 
        message: err.message,
        stack: err.stack
    })
})

module.exports = router;
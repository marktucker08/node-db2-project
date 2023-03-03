const Cars = require('./cars-model');
const vinValidator = require('vin-validator');
const db = require('../../data/db-config')

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params;
  const car = await Cars.getById(id);
  if (!car) {
    res.status(404).json({ message: `car with id ${id} is not found` })
  } else {
    req.car = car;
    next();
  }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const { vin, make, model, mileage } = req.body
  if (!vin) {
    next({ status: 400, message: 'vin is missing' })
  }
  else if (!make) {
    next({ status: 400, message: 'make is missing' })
  }
  else if (!model) {
    next({ status: 400, message: 'model is missing' })
  }
  else if (!mileage) {
    next({ status: 400, message: 'mileage is missing' })
  } else {
  next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const isValidVin = vinValidator.validate(req.body.vin)
  if (isValidVin) {
    next()
  } else {
    next({ status: 400, message: `vin ${req.body.vin} is invalid` })
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try { 
    const unique = await db('cars').where('vin', req.body.vin)
    if (unique) {
      res.status(400).json({ message: `vin ${req.body.vin} already exists` })
    } else {
      next()
    }
  }
  catch(err) {
    next(err)
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}

const Cars = require('./cars-model');

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params;
  const car = await Cars.getById(id);
  if (!car) {
    res.status(404).json({ message: `care with id ${id} is not found` })
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
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}

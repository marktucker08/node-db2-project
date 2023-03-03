const db = require('../../data/db-config');

const getAll = async () => {
  // DO YOUR MAGIC
  const result = await db('cars');
  return result;
}


const getById = async (id) => {
  // DO YOUR MAGIC
  const result = await db('cars').where('id', id).first();
  return result;
}

const create = async (car) => {
  // DO YOUR MAGIC
  const result = await db('cars').insert(car);
  const newCar = getById(result);
  return newCar;
}

module.exports = {
  getAll,
  getById,
  create
}

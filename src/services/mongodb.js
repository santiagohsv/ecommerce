const mongoose = require('mongoose');
const logger = require('./logger');
const connectionString = process.env.BD 

const initMongoDB = async () => {
  try {
    await mongoose.connect(connectionString);
    logger.info('Contectado a la BD');
  } catch (err) {
    logger.info('No se pudo conectar a la BD', err);
  }
};

module.exports = initMongoDB;
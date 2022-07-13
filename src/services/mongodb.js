const mongoose = require('mongoose');

const connectionString = process.env.BD 

const initMongoDB = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log('Contectado a la BD');
  } catch (err) {
    console.log('No se pudo conectar a la BD', err);
  }
};

module.exports = initMongoDB;
const { ProductModel } = require("../models/products");
const logger = require('../services/logger')

class Contenedor {
  getAll = async () => {
    try {
      const data = await ProductModel.find();
      return data;
    } catch (err) {
     logger.error("Error de lectura", err.message);
    }
  };

  getById = async (id) => {
    try {
      const data = await ProductModel.findById(id);
      return data;
    } catch (err) {
      logger.error("Error de lectura", err.message);
    }
  };

  save = async (object) => {
    try {
      const newProduct = {
        title: object.title,
        price: object.price,
        thumbnail: object.thumbnail,
      };
      await ProductModel.create(newProduct);
      return newProduct;
    } catch (err) {
   logger.error("Error de lectura", err.message);
    }
  };

  deleteById = async (id) => {
    try {
      await ProductModel.findByIdAndDelete(id);
    } catch (err) {
    logger.error(err.message);
    }
  };

  update = async (id, data) => {
    try {
      await ProductModel.findByIdAndUpdate(id, data);
    } catch (err) {
    logger.error(err.message);
     
    }
  };
}

const productsDB = new Contenedor();

module.exports = productsDB;

const { CartModel } = require("../models/carrito");
const logger = require('../services/logger')

class Cart {
  newCart = async () => {
    try {
      await CartModel.create({ productList: [] });
      return "Nuevo carrito agregado";
    } catch (err) {
      logger.error("No se pudo crear el carrito ", err.message);
    }
  };

  getCart = async () => {
    try {
      const carts = await CartModel.find();
      return carts;
    } catch (err) {
      logger.error("Error de lectura", err.message);
    }
  };

  getById = async (id) => {
    try {
      const data = await CartModel.findById(id);
      return data;
    } catch (err) {
      logger.error("Error de lectura", err.message);
    }
  };

  cartUpdate = async (id, newProd) => {
    try {
      const data = await this.getById(id); // traigo el carrito
      const prodList = data.productList; // pido el listado de productos.
      prodList.push(newProd); // agrego producto
      await CartModel.findByIdAndUpdate(id, { productList: prodList }); // actualizo el carrito
      return prodList;
    } catch (err) {
      logger.error("No se pudo actualizar el carrito ", err.message);
    }
  };

  deleteById = async (id) => {
    try {
      await CartModel.findByIdAndDelete(id);
    } catch (err) {
      logger.error("No se pudo eliminar el carrito", err.message);
    }
  };

  deleteProduct = async (id, prodId) => {
    try {
      const data = await this.getById(id); // traigo el carrito
      const prodList = data.productList; // pido el listado de productos.
      let productIndex = prodList.findIndex((product) => product.id === prodId); // busco el index del producto a elimminar
      prodList.splice(productIndex, 1); // elimino producto
      await CartModel.findByIdAndUpdate(id, { productList: prodList }); // actualizo carrito
      return prodList;
    } catch (err) {
      logger.error("No se pudo eliminar el carrito", err.message);
    }
  };
}

const carrito = new Cart();

module.exports = carrito;

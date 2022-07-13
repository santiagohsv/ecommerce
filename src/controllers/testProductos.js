const { faker } = require("@faker-js/faker");

class Contenedor {
  getProducts = async () => {
    try {
      let data = [];

      for (let i = 0; i < 5; i++) {
        data.push({
          name: faker.commerce.productName(),
          price: faker.commerce.price(),
          thumbnail: faker.image.technics(500, 500, true),
        });
      }
      return data;
    } catch (err) {
      console.log("Error de lectura", err.message);
    }
  };
}

const testProductos = new Contenedor();

module.exports = testProductos;

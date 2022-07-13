const express = require("express");
const router = express.Router();
const cartController = require('../controllers/cart')
const productController = require('../controllers/products');
const {newCartMail} = require('../services/mail')
const newCartWpp = require('../services/whatsapp')


// NUEVO CARRITO.

router.post("/", (req, res) => {
  cartController.newCart().then((data)=>{
    res.json({msg:'nuevo carrito creado'});
  })
});

// ELIMINAR CARRITO POR ID

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  cartController.deleteById(id).then(() => {
    res.json({ msg: `Carrito ID:${id} eliminado`});
  });
});

// CONSULTA TODOS LOS CARRITOS

router.get("/", (req, res) => {
  cartController.getCart().then((data)=>{
    if (data.length === 0){
      res.json({msg:'no existen carritos'})
    }
    res.json(data)
  })
 });

// CONSULTA PRODUCTOS EN CARRITO POR ID DE CARRITO

router.get("/:id/productos", (req, res) => {
 const id = req.params.id;
 cartController.getById(id).then((data)=>{
   res.json(data)
 })
});

// AGREGAR PRODUCTOS AL CARRITO. 

router.post("/:id/productos", (req, res) => {
  const productId = req.body;
  const id = req.params.id;

  productController.getById(productId.id).then((newProd) => {
    cartController.cartUpdate(id, newProd).then((data) => {
      res.send(data);
    });
  });
});

// ELIMINAR PRODUCTO POR ID DE CARRITO Y PRODUCTO.

router.delete("/:id/productos/:idProd", (req, res) => {
  const id = req.params.id;
  const prodId = req.params.idProd;

  cartController.deleteProduct(id, prodId).then((data)=>{
    res.send(data);
  })
});

// CHECK
router.post("/check", (req, res) => {
  const { mail, nombre } = req.user;
  const id = req.query.id;
  cartController.getById(id).then((order) => {
    let list = [];
    order.productList.forEach((item) => {
      list.push(item.title);
    });
    newCartMail(mail, nombre, list.join(" - ")) 
    newCartWpp(mail, nombre);
    res.send("Orden enviada correctamente");
  });
});


module.exports = router;





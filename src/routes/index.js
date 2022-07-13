const express = require('express');
const router = express.Router();
const routerProductos = require('./products')
const routerCarrito = require('./carrito'); 
const routherAuth = require('./auth')
const randomRouter =  require('./random')

router.use('/productos', routerProductos);
router.use('/carrito', routerCarrito);
router.use('/auth', routherAuth);
router.use('/random', randomRouter);

module.exports = router;   


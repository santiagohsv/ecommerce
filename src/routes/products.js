const express = require("express");
const router = express.Router();
const productController = require('../controllers/products')


router.get("/", (req, res) => {
  productController.getAll().then((data) => {
    res.send(data);  
  });
});


router.get("/:id", (req, res) => {
  const id = req.params.id;
  productController.getById(id).then((data)=>{
    res.send(data);
  });
});

router.post("/save", (req, res) => {
  const newProduct = req.body;
  productController.save(newProduct).then((data) => {
    res.json([{
      msg: newProduct, 
    },{newProduct}]);
  });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const productUpdate = req.body;
  productController.update(id, productUpdate).then(()=>{
    res.json([{
      msg: "product actualizado",
    },{
      productUpdate
    }]);
  });
});


router.delete("/:id", (req, res) => {
  const id = req.params.id;

  productController.deleteById(id).then(() => {
    res.json({
      msg: "producto eliminado",
    });
  });
});

module.exports = router;

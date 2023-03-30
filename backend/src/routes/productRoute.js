const router = require('express').Router();
const productController = require('../controller/productController');

router
  .route('/products')
  .post(productController.addProduct)
  .get(productController.getAllProducts);

router
  .route('/products/:productId')
  .get(productController.getProductById)
  .put(productController.editProductById)
  .delete(productController.deleteProductById);

module.exports = router;

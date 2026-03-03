const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const productValidation = require('../middlewares/validations/productValidation');

// Rutas de Productos
router.get('/products/cart', productsController.cart);
router.get('/products/create', productsController.create);
router.post('/products', productValidation, productsController.store);
router.get('/products/:id/edit', productsController.edit);
router.put('/products/:id', productValidation, productsController.update);
router.delete('/products/:id', productsController.destroy);
router.get('/products/:id', productsController.detail);

module.exports = router;

const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// Rutas de Productos
router.get('/products/cart', productsController.cart);
router.get('/products/create', productsController.create);
router.post('/products', productsController.store);
router.get('/products/:id/edit', productsController.edit);
router.put('/products/:id', productsController.update);
router.get('/products/:id', productsController.detail);

module.exports = router;

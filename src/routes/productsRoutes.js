const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// Rutas de Productos
router.get('/products/detail', productsController.detail);
router.get('/products/cart', productsController.cart);
router.get('/products/create', productsController.create);
router.get('/products/edit', productsController.edit);

module.exports = router;

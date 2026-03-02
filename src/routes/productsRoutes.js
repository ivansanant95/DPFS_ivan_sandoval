const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// Rutas de Productos
router.get('/products/detail', productsController.detail);
router.get('/products/cart', productsController.cart);

module.exports = router;

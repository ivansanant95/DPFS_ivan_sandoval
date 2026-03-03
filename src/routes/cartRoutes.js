const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');

// Middleware para asegurar que el usuario esté logueado
const requiresLogin = (req, res, next) => {
    if (!req.session.userLogged) return res.redirect('/login');
    next();
};

// Rutas del Carrito (Abiertas para Invitados y Registrados)
router.get('/cart', cartController.viewCart);
router.post('/cart/add/:id', cartController.addToCart);
router.put('/cart/edit/:id', cartController.updateCartItem);
router.delete('/cart/remove/:id', cartController.removeCartItem);

// Checkout (Abierto para todos)
router.get('/checkout', cartController.checkout);
router.post('/checkout/confirm', cartController.confirmOrder);

module.exports = router;

const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const productsController = require('../controllers/productsController');
const productValidation = require('../middlewares/validations/productValidation');

// Configuración de Multer para Imágenes de Producto
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images/products'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const uploadFile = multer({ storage });

// Rutas de Productos
router.get('/products/cart', productsController.cart);
router.get('/products/create', productsController.create);
router.post('/products', uploadFile.single('image'), productValidation, productsController.store);
router.get('/products/:id/edit', productsController.edit);
router.put('/products/:id', uploadFile.single('image'), productValidation, productsController.update);
router.delete('/products/:id', productsController.destroy);
router.get('/products/:id', productsController.detail);

module.exports = router;

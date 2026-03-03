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

const adminMiddleware = require('../middlewares/adminMiddleware');

// Rutas de Productos
router.get('/products/create', adminMiddleware, productsController.create);
router.post('/products', adminMiddleware, uploadFile.single('image'), productValidation, productsController.store);
router.get('/products/:id/edit', adminMiddleware, productsController.edit);
router.put('/products/:id', adminMiddleware, uploadFile.single('image'), productValidation, productsController.update);
router.delete('/products/:id', adminMiddleware, productsController.destroy);
router.get('/products/:id', productsController.detail);

module.exports = router;

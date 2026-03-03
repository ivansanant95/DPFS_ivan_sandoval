const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const servicesController = require('../controllers/servicesController');
const adminMiddleware = require('../middlewares/adminMiddleware');
const serviceValidation = require('../middlewares/validations/serviceValidation');

// Configuración de Multer para Imágenes de Servicios
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images/services'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'service-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const uploadFile = multer({ storage });

// Listado de Servicios Técnicos
router.get('/services', servicesController.list);

// Formulario de creación (Solo Admin)
router.get('/services/create', adminMiddleware, servicesController.create);

// Detalle de un Servicio Técnico puntual (para contratación)
router.get('/services/:id', servicesController.detail);

// Formulario de edición (Solo Admin)
router.get('/services/:id/edit', adminMiddleware, servicesController.edit);

// Acción de actualización (Solo Admin)
router.put('/services/:id', adminMiddleware, uploadFile.single('image'), serviceValidation, servicesController.update);

// Acción de borrado (Solo Admin)
router.delete('/services/:id', adminMiddleware, servicesController.destroy);

// Acción de creación (Solo Admin)
router.post('/services', adminMiddleware, uploadFile.single('image'), serviceValidation, servicesController.store);

module.exports = router;

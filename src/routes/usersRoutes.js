const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const usersController = require('../controllers/usersController');

// Configuración de Multer para Fotos de Usuario
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images/users'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'avatar-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const uploadFile = multer({ storage });

// Rutas de Usuarios
router.get('/login', usersController.login);

router.get('/register', usersController.register);
router.post('/register', uploadFile.single('avatar'), usersController.processRegister);

module.exports = router;

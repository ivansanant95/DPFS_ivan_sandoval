const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const usersController = require('../controllers/usersController');

// Importar Middlewares de Seguridad
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const registerValidation = require('../middlewares/validations/registerValidation');
const loginValidation = require('../middlewares/validations/loginValidation');

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
// (Solo visitantes sin cuenta pueden ver Login y Registro)
router.get('/login', guestMiddleware, usersController.login);
router.post('/login', loginValidation, usersController.processLogin);

router.get('/register', guestMiddleware, usersController.register);
router.post('/register', uploadFile.single('avatar'), registerValidation, usersController.processRegister);

// Rutas Restringidas
// (Solo usuarios logueados pueden ver su Perfil y desloguearse)
router.get('/profile', authMiddleware, usersController.profile);
router.post('/logout', usersController.logout);

module.exports = router;

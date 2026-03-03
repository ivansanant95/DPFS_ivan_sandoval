const { body } = require('express-validator');

// Reglas de Validación de Intermediario para Login
const loginValidation = [
    body('email')
        .notEmpty().withMessage('Debes ingresar un correo electrónico')
        .isEmail().withMessage('El formato de correo no es válido'),

    body('password')
        .notEmpty().withMessage('Debes ingresar tu contraseña para iniciar sesión')
];

module.exports = loginValidation;

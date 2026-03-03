const { body } = require('express-validator');
const path = require('path');
const db = require('../../database/models');

const registerValidation = [
    // 1. Nombre y Apellido
    body('firstName')
        .notEmpty().withMessage('Debes ingresar tu nombre').bail()
        .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),

    body('lastName')
        .notEmpty().withMessage('Debes ingresar tu apellido').bail()
        .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),

    // 2. Correo Electrónico
    body('email')
        .notEmpty().withMessage('Debes ingresar un correo electrónico').bail()
        .isEmail().withMessage('Debes ingresar un formato de correo válido (ej: nombre@mail.com)').bail()
        .custom(async (value) => {
            // Validación Asíncrona: Verificamos si el email ya existe en la Base de Datos
            const existingUser = await db.User.findOne({ where: { email: value } });
            if (existingUser) {
                throw new Error('Este correo electrónico ya se encuentra registrado');
            }
            return true;
        }),

    // 3. Contraseña Fuerte
    body('password')
        .notEmpty().withMessage('Debes ingresar una contraseña').bail()
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres').bail()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .withMessage('La contraseña debe tener mayúsculas, minúsculas, un número y un carácter especial'),

    // 4. Input Auxiliar (Confirmar contraseña)
    body('confirm_password')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Las contraseñas no coinciden');
            }
            return true;
        }),

    // 5. Validación de Imagen (Multer manda el archivo a req.file, no en req.body)
    body('avatar')
        .custom((value, { req }) => {
            let file = req.file;
            let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

            // La imagen no es obligatoria, pero si sube una, DEBE ser válida
            if (file) {
                let fileExtension = path.extname(file.originalname).toLowerCase();
                if (!acceptedExtensions.includes(fileExtension)) {
                    throw new Error(`Las extensiones permitidas para la imagen son: ${acceptedExtensions.join(', ')}`);
                }
            }
            return true;
        })
];

module.exports = registerValidation;

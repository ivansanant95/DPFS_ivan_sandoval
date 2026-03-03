const { body } = require('express-validator');
const path = require('path');

const serviceValidation = [
    body('name')
        .notEmpty().withMessage('El nombre del servicio es obligatorio').bail()
        .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),

    body('description')
        .notEmpty().withMessage('La descripción es obligatoria').bail()
        .isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres'),

    body('price')
        .notEmpty().withMessage('El precio es obligatorio').bail()
        .isDecimal().withMessage('El precio debe ser un número válido'),

    body('estimated_time')
        .notEmpty().withMessage('El tiempo estimado es obligatorio'),

    body('image').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

        if (file) {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    })
];

module.exports = serviceValidation;

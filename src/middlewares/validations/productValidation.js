const { body } = require('express-validator');
const path = require('path');
const db = require('../../database/models');

const productValidation = [
    // 1. Nombre del Producto
    body('name')
        .notEmpty().withMessage('El nombre del producto es obligatorio').bail()
        .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),

    // 2. Descripción
    body('description')
        .notEmpty().withMessage('La descripción del producto es obligatoria').bail()
        .isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres para detallar bien el repuesto'),

    // 3. Validación de Tabla Secundaria (Categoría Existente) Opcional pero recomendada
    body('category')
        .notEmpty().withMessage('Debes seleccionar una categoría').bail()
        .custom(async (value) => {
            const existingCategory = await db.Category.findByPk(value);
            if (!existingCategory) {
                throw new Error('La categoría seleccionada no existe en la Base de Datos');
            }
            return true;
        }),

    // 4. Validación de Precio (Numérico)
    body('price')
        .notEmpty().withMessage('El precio es obligatorio').bail()
        .isNumeric().withMessage('El precio debe ser un valor numérico'),

    // 5. Validación de Imagen (Multer manda el archivo a req.file)
    body('image')
        .custom((value, { req }) => {
            let file = req.file;
            let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

            // Al crear o editar, la foto no es estrictamente requerida (usamos default-image)
            // Pero si envían un archivo, DEBE ser una imagen válida.
            if (file) {
                let fileExtension = path.extname(file.originalname).toLowerCase();
                if (!acceptedExtensions.includes(fileExtension)) {
                    throw new Error(`Las extensiones permitidas son ${acceptedExtensions.join(', ')}`);
                }
            }
            return true;
        })
];

module.exports = productValidation;

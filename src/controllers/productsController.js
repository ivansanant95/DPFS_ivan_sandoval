const path = require('path');
const fs = require('fs');

// Requerimos los modelos de Sequelize
const db = require('../database/models');
const { validationResult } = require('express-validator');

const productsController = {
    // Renderiza la vista de Detalles de un producto
    detail: async (req, res) => {
        try {
            // Buscar el producto por Clave Primaria (Primary Key) en MySQL
            const product = await db.Product.findByPk(req.params.id);

            if (product) {
                res.render('products/productDetail', { product: product });
            } else {
                res.status(404).send('Producto no encontrado');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor al consultar la base de datos');
        }
    },

    // Renderiza la vista del Carrito de compras
    cart: (req, res) => {
        res.render('products/productCart');
    },

    // Renderiza el listado filtrado por Categoría
    byCategory: async (req, res) => {
        try {
            const categoryId = req.params.categoryId;

            // Buscar la categoría para obtener su nombre (sirve para el título de la vista)
            const category = await db.Category.findByPk(categoryId);

            if (!category) {
                return res.status(404).send('Categoría no encontrada');
            }

            // Buscar todos los productos que pertenezcan a esa category_id
            const products = await db.Product.findAll({
                where: { category_id: categoryId }
            });

            // Renderizar la NUEVA vista pasándole nombre de la categoría y los productos filtrados
            res.render('products/productList', {
                title: `${category.name} - Reparatech`,
                categoryName: category.name,
                products: products
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor al filtrar categorías');
        }
    },

    // Renderiza el formulario de Creación de Producto
    create: async (req, res) => {
        try {
            // Traer todas las categorías para llenar el <select> en EJS
            const categories = await db.Category.findAll();
            res.render('products/productCreate', { categories });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    },

    // Procesa el formulario y guarda el nuevo producto en MySQL
    store: async (req, res) => {
        try {
            // Evaluamos si pasamos el escudo de validacion de express-validator
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                // Volvemos a consultar categorías para que el <select> no se rompa
                const categories = await db.Category.findAll();
                return res.render('products/productCreate', {
                    categories,
                    errors: errors.mapped(),
                    oldData: req.body
                });
            }

            // Determinamos la ruta de la imagen según Multer
            let imageFile = "https://via.placeholder.com/400x400?text=Nuevo+Producto";
            if (req.file && req.file.filename) {
                imageFile = '/images/products/' + req.file.filename;
            }

            // Creamos el producto directamente usando Sequelize
            await db.Product.create({
                name: req.body.name,
                description: req.body.description,
                price: parseFloat(req.body.price),
                category_id: req.body.category, // El name del form debe coincidir
                stock: 0, // Stock inicial
                image: imageFile
            });

            // Redirigir al usuario al listado de productos (Home)
            res.redirect('/');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al intentar crear el producto en la Base de Datos');
        }
    },

    // Renderiza el formulario de Edición de Producto
    edit: async (req, res) => {
        try {
            // Requerimos el producto puntual y de paso todas las categorías
            const productToEdit = await db.Product.findByPk(req.params.id);
            const categories = await db.Category.findAll();

            if (productToEdit) {
                res.render('products/productEdit', { product: productToEdit, categories });
            } else {
                res.status(404).send('Producto no encontrado para editar');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    },

    // Procesa los datos editados y sobrescribe SQL
    update: async (req, res) => {
        try {
            const productId = req.params.id;

            // Evaluamos si pasamos el escudo en Updates
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                // Hay que mandarle los datos simulando que es un product para repoblar
                const productToEdit = await db.Product.findByPk(productId);
                const categories = await db.Category.findAll();
                return res.render('products/productEdit', {
                    product: productToEdit,
                    categories,
                    errors: errors.mapped(),
                    oldData: req.body
                });
            }

            // Preparamos el objeto con los datos a actualizar
            const updateData = {
                name: req.body.name,
                description: req.body.description,
                price: parseFloat(req.body.price),
                category_id: req.body.category
            };

            if (req.body.stock !== undefined) {
                updateData.stock = parseInt(req.body.stock, 10);
            }
            if (req.file && req.file.filename) {
                updateData.image = '/images/products/' + req.file.filename;
            }

            // Actualizamos en la base de datos indicando el WHERE
            await db.Product.update(updateData, { where: { id: productId } });

            res.redirect('/products/' + productId); // Redirigimos al detalle para ver los cambios
        } catch (error) {
            console.error(error);
            res.status(500).send('No se pudo actualizar el producto');
        }
    },

    // Elimina un producto de la base de datos
    destroy: async (req, res) => {
        try {
            await db.Product.destroy({
                where: { id: req.params.id }
            });

            // Redirigimos al home
            res.redirect('/');
        } catch (error) {
            console.error(error);
            res.status(500).send('No se pudo eliminar el producto de MySQL');
        }
    }
};

module.exports = productsController;

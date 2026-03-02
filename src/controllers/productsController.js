const path = require('path');
const fs = require('fs');

const productsController = {
    // Renderiza la vista de Detalles de un producto
    detail: (req, res) => {
        const productsFilePath = path.join(__dirname, '../data/products.json');
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        // Buscar el producto por su ID (convirtiendo el string de la URL a número)
        const product = products.find(p => p.id === parseInt(req.params.id, 10));

        if (product) {
            res.render('products/productDetail', { product: product });
        } else {
            res.status(404).send('Producto no encontrado');
        }
    },

    // Renderiza la vista del Carrito de compras
    cart: (req, res) => {
        res.render('products/productCart');
    },

    // Renderiza el formulario de Creación de Producto
    create: (req, res) => {
        res.render('products/productCreate');
    },

    // Renderiza el formulario de Edición de Producto
    edit: (req, res) => {
        res.render('products/productEdit');
    }
};

module.exports = productsController;

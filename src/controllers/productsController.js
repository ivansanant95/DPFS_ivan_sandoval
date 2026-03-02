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

    // Procesa el formulario y guarda el nuevo producto
    store: (req, res) => {
        const productsFilePath = path.join(__dirname, '../data/products.json');
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        // Generar un nuevo ID dinámico (el mayor actual + 1)
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

        // Armar el nuevo objeto de producto con los datos del form (req.body)
        const newProduct = {
            id: newId,
            name: req.body.name,
            description: req.body.description,
            price: parseFloat(req.body.price),
            category: req.body.category,
            // Por ahora simularemos la imagen
            image: "https://via.placeholder.com/400x400?text=Nuevo+Producto",
            // Los checkboxes (colors) pueden ser undefined, un string o un array.
            colors: req.body.colors ? (Array.isArray(req.body.colors) ? req.body.colors : [req.body.colors]) : []
        };

        // Agregar al array
        products.push(newProduct);

        // Sobrescribir el archivo JSON con la información actualizada
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf-8');

        // Redirigir al usuario al listado de productos (Home)
        res.redirect('/');
    },

    // Renderiza el formulario de Edición de Producto
    edit: (req, res) => {
        res.render('products/productEdit');
    }
};

module.exports = productsController;

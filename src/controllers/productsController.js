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
        const productsFilePath = path.join(__dirname, '../data/products.json');
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        const productToEdit = products.find(p => p.id === parseInt(req.params.id, 10));

        if (productToEdit) {
            res.render('products/productEdit', { product: productToEdit });
        } else {
            res.status(404).send('Producto no encontrado para editar');
        }
    },

    // Procesa los datos editados y sobrescribe el JSON
    update: (req, res) => {
        const productsFilePath = path.join(__dirname, '../data/products.json');
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        const productId = parseInt(req.params.id, 10);

        // Encontramos el índice del producto a modificar
        const index = products.findIndex(p => p.id === productId);

        if (index !== -1) {
            // Actualizamos solo los campos recibidos, manteniendo ID e Imagen 
            products[index] = {
                ...products[index],
                name: req.body.name,
                description: req.body.description,
                price: parseFloat(req.body.price),
                category: req.body.category,
                colors: req.body.colors ? (Array.isArray(req.body.colors) ? req.body.colors : [req.body.colors]) : []
            };

            // Guardamos el JSON
            fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf-8');
            res.redirect('/products/' + productId); // Redirigimos al detalle para ver los cambios
        } else {
            res.status(404).send('No se pudo actualizar el producto');
        }
    },

    // Elimina un producto de la base de datos
    destroy: (req, res) => {
        const productsFilePath = path.join(__dirname, '../data/products.json');
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        const productId = parseInt(req.params.id, 10);

        // Filtramos: Nos quedamos con todos los productos MENOS el que queremos borrar
        const remainingProducts = products.filter(p => p.id !== productId);

        // Sobrescribimos el archivo JSON
        fs.writeFileSync(productsFilePath, JSON.stringify(remainingProducts, null, 2), 'utf-8');

        // Redirigimos al home
        res.redirect('/');
    }
};

module.exports = productsController;

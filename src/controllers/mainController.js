const path = require('path');
const fs = require('fs');

const mainController = {
    // Renderiza la página de Inicio (Home)
    index: (req, res) => {
        // Leer la base de datos JSON
        const productsFilePath = path.join(__dirname, '../data/products.json');
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        // Render 'index.ejs' y pasarle los productos
        res.render('index', {
            title: 'Reparatech - Especialistas en Telefonía Móvil',
            cssFile: 'home.css',
            products: products
        });
    }
};

module.exports = mainController;

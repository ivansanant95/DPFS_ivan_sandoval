const path = require('path');
const fs = require('fs');

// Requerimos la base de datos de Sequelize
const db = require('../database/models');

const mainController = {
    // Renderiza la página de Inicio (Home)
    index: async (req, res) => {
        try {
            // Leer todos los productos de la base de datos MySQL usando el modelo Product
            const products = await db.Product.findAll();

            // Render 'index.ejs' y pasarle los productos
            res.render('index', {
                title: 'Reparatech - Especialistas en Telefonía Móvil',
                cssFile: 'home.css',
                products: products
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Hubo un error al intentar conectarse a la base de datos');
        }
    }
};

module.exports = mainController;

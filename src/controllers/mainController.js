const path = require('path');

const mainController = {
    // Renderiza la página de Inicio (Home)
    index: (req, res) => {
        // Render 'index.ejs' 
        res.render('index', {
            title: 'Reparatech - Especialistas en Telefonía Móvil',
            cssFile: 'home.css' // Permite cargar CSS específico en head.ejs
        });
    }
};

module.exports = mainController;

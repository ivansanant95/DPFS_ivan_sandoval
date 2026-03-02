const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de recursos estáticos (CSS, Imágenes)
app.use(express.static(path.join(__dirname, '../public')));

// Configuración del Motor de Plantillas (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Importación de Enrutadores
const mainRoutes = require('./routes/mainRoutes');
const usersRoutes = require('./routes/usersRoutes');

// Uso de Rutas
app.use('/', mainRoutes);
app.use('/', usersRoutes);

// Levantar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

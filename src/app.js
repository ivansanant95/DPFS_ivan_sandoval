const express = require('express');
const path = require('path');

const methodOverride = require('method-override'); // Permite usar PUT y DELETE
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración Middlewares para Formularios y JSON
app.use(express.urlencoded({ extended: false })); // Permite capturar información de formularios (req.body)
app.use(express.json()); // Permite capturar JSON
app.use(methodOverride('_method')); // Permite pisar el método POST por PUT/DELETE (?_method=PUT)

// Configuración del manejo de Sesiones y Cookies
app.use(session({
    secret: 'ReparatechSecretKey2026', // Clave privada para firmar la sesión
    resave: false,                     // No guarda la sesión si no hubo cambios
    saveUninitialized: false           // No guarda sesiones vacías
}));
app.use(cookieParser());

// Configuración de auto-login y variables locales para vistas
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
app.use(userLoggedMiddleware);

// Configuración de recursos estáticos (CSS, Imágenes)
app.use(express.static(path.join(__dirname, '../public')));

// Configuración del Motor de Plantillas (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Importación de Enrutadores
const mainRoutes = require('./routes/mainRoutes');
const usersRoutes = require('./routes/usersRoutes');
const productsRoutes = require('./routes/productsRoutes');

// Uso de Rutas
app.use('/', mainRoutes);
app.use('/', usersRoutes);
app.use('/', productsRoutes);

// Levantar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

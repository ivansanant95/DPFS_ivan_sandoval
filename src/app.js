const express = require('express');
const path = require('path');
const cors = require('cors');

const methodOverride = require('method-override'); // Permite usar PUT y DELETE
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración Middlewares para Formularios y JSON
app.use(cors()); // Habilita peticiones cruzadas (React -> Node)
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

// Importación de Enrutadores Frontend EJS
const mainRoutes = require('./routes/mainRoutes');
const usersRoutes = require('./routes/usersRoutes');
const productsRoutes = require('./routes/productsRoutes');
const cartRoutes = require('./routes/cartRoutes');
const servicesRoutes = require('./routes/servicesRoutes');

// Importación de Enrutadores Backend APIs
const apiUsersRoutes = require('./routes/api/usersAPIRoutes');
const apiProductsRoutes = require('./routes/api/productsAPIRoutes');
const apiServicesRoutes = require('./routes/api/servicesAPIRoutes');

// Uso de Rutas Frontend
app.use('/', mainRoutes);
app.use('/', usersRoutes);
app.use('/', productsRoutes);
app.use('/', cartRoutes);
app.use('/', servicesRoutes);

// Uso de Rutas Backend APIs
app.use('/api/users', apiUsersRoutes);
app.use('/api/products', apiProductsRoutes);
app.use('/api/services', apiServicesRoutes);

// Levantar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

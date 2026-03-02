const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const usersController = {
    // Renderiza la vista de Login
    login: (req, res) => {
        res.render('users/login');
    },

    // Procesa el inicio de sesión
    processLogin: (req, res) => {
        const usersFilePath = path.join(__dirname, '../data/users.json');
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

        // Buscar al usuario por email
        const userToLogin = users.find(user => user.email === req.body.email);

        if (userToLogin) {
            // Comparar la contraseña ingresada con el hash guardado
            const isPasswordValid = bcrypt.compareSync(req.body.password, userToLogin.password);

            if (isPasswordValid) {
                // Borrar la contraseña por seguridad antes de subir el usuario a session
                delete userToLogin.password;

                // Levantar la sesión
                req.session.userLogged = userToLogin;

                // Setear Cookie si el usuario tildó "Recordarme"
                if (req.body.remember) {
                    // Cookie vive 60 minutos (ejemplo: 1000 * 60 * 60)
                    res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60 * 60) });
                }

                return res.redirect('/');
            }
        }

        // Si el usuario no se encuentra o la contraseña es inválida
        return res.render('users/login', {
            errors: {
                login: {
                    msg: 'Las credenciales proporcionadas son inválidas'
                }
            }
        });
    },

    // Renderiza la vista de Registro
    register: (req, res) => {
        res.render('users/register');
    },

    // Procesa la creación de un nuevo usuario
    processRegister: (req, res) => {
        const usersFilePath = path.join(__dirname, '../data/users.json');
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

        // Generar un nuevo ID dinámico
        const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

        // Determinar qué imagen guardar (la que subió o una por defecto)
        const imageFile = req.file ? req.file.filename : 'default-avatar.png';

        // Encriptar la contraseña (Hash salteado 10 veces)
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);

        // Armar el nuevo objeto de usuario
        const newUser = {
            id: newId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            category: 'customer', // Por defecto todos son clientes web
            image: imageFile,
            phone: req.body.phone || ''
        };

        // Guardar en el array scribir el JSON
        users.push(newUser);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');

        // Redirigir al login para que inicie sesión con su nueva cuenta
        res.redirect('/login');
    },

    // Renderiza el Perfil del usuario autenticado
    profile: (req, res) => {
        // Obtenemos los datos desde la Sesión Temporal
        return res.render('users/profile', {
            user: req.session.userLogged
        });
    },

    // Destruye la sesión y desloguea al usuario
    logout: (req, res) => {
        // Destruir Cookie de recordame
        res.clearCookie('userEmail');
        // Destruir Sesión de RAM
        req.session.destroy();
        return res.redirect('/');
    }
};

module.exports = usersController;

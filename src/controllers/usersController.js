const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const db = require('../database/models');

const usersController = {
    // Renderiza la vista de Login
    login: (req, res) => {
        res.render('users/login');
    },

    // Procesa el inicio de sesión
    processLogin: async (req, res) => {
        try {
            // Buscar al usuario por email en la BD
            const userToLogin = await db.User.findOne({
                where: { email: req.body.email }
            });

            if (userToLogin) {
                // Comparar la contraseña ingresada con el hash guardado
                const isPasswordValid = bcrypt.compareSync(req.body.password, userToLogin.password);

                if (isPasswordValid) {
                    // Mapear los datos de SQL a camelCase para no romper las vistas EJS actuales
                    req.session.userLogged = {
                        id: userToLogin.id,
                        firstName: userToLogin.first_name,
                        lastName: userToLogin.last_name,
                        email: userToLogin.email,
                        phone: userToLogin.phone,
                        role_id: userToLogin.role_id,
                        image: userToLogin.image
                    };

                    // Setear Cookie si el usuario tildó "Recordarme"
                    if (req.body.remember) {
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
        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno en la capa de autenticación');
        }
    },

    // Renderiza la vista de Registro
    register: (req, res) => {
        res.render('users/register');
    },

    // Procesa la creación de un nuevo usuario
    processRegister: async (req, res) => {
        try {
            // Validación temporal: Verificar que el email no exista ya en la Base de Datos
            const existingUser = await db.User.findOne({ where: { email: req.body.email } });
            if (existingUser) {
                // Si el correo ya existe, devolvemos a la vista con un mensaje amigable
                return res.render('users/register', {
                    errors: { email: { msg: 'Este correo electrónico ya se encuentra registrado' } },
                    oldData: req.body // Mantenemos los datos escritos por el usuario (Opcional, según diseño de tu EJS)
                });
            }

            // Verificar si el middleware Multer subió un archivo, sino enviamos foto por defecto
            let imageFile = 'default-avatar.png';
            if (req.file && req.file.filename) {
                imageFile = req.file.filename;
            }

            // Encriptar la contraseña (Hash salteado 10 veces)
            const hashedPassword = bcrypt.hashSync(req.body.password, 10);

            // Crear el objeto de usuario directamente en SQL
            await db.User.create({
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                email: req.body.email,
                password: hashedPassword,
                role_id: 2, // 2 equivale a "customer" en data.sql
                image: imageFile,
                phone: req.body.phone || ''
            });

            // Redirigir al login para que inicie sesión con su nueva cuenta en MySQL
            res.redirect('/login');
        } catch (error) {
            console.error("Error intentando registrar al usuario en la BD:", error);
            res.status(500).send('Error intentando registrar al usuario en la BD');
        }
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

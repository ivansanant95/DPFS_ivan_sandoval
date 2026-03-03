const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const { validationResult } = require('express-validator');
const db = require('../database/models');

const usersController = {
    // Renderiza la vista de Login
    login: (req, res) => {
        res.render('users/login');
    },

    // Procesa el inicio de sesión
    processLogin: async (req, res) => {
        try {
            // Evaluamos si el Escudo de Validación Backend fue quebrado
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render('users/login', {
                    errors: errors.mapped(),
                    oldData: req.body
                });
            }

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
            // Atrapamos cualquier error generado por Express Validator
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render('users/register', {
                    errors: errors.mapped(),
                    oldData: req.body
                });
            }

            let imageFile = 'default-avatar.png';
            if (req.file && req.file.filename) {
                imageFile = req.file.filename;
            }

            const hashedPassword = bcrypt.hashSync(req.body.password, 10);

            await db.User.create({
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                email: req.body.email,
                password: hashedPassword,
                role_id: 2, // Default to customer
                image: imageFile,
                phone: req.body.phone || ''
            });

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

    profileEdit: (req, res) => {
        return res.render('users/profileEdit', {
            user: req.session.userLogged
        });
    },

    profileUpdate: async (req, res) => {
        try {
            const userId = req.session.userLogged.id;
            const userInDb = await db.User.findByPk(userId);

            if (!userInDb) return res.redirect('/login');

            let imageFile = userInDb.image;
            if (req.file && req.file.filename) {
                // Borrar imagen anterior si no es la default
                if (imageFile && imageFile !== 'default-avatar.png') {
                    const oldPath = path.join(__dirname, '../../public/images/users/', imageFile);
                    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
                }
                imageFile = req.file.filename;
            }

            const updateData = {
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone,
                image: imageFile
            };

            // Si el usuario ingresó una nueva contraseña, la hasheamos y la incluimos
            if (req.body.password && req.body.password.trim() !== '') {
                updateData.password = bcrypt.hashSync(req.body.password, 10);
            }

            await db.User.update(updateData, {
                where: { id: userId }
            });

            // Actualizar Sesión
            req.session.userLogged = {
                ...req.session.userLogged,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone,
                image: imageFile
            };

            res.redirect('/profile');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error updating profile');
        }
    },

    // Sprint 11: Administración de Usuarios
    userList: async (req, res) => {
        try {
            const users = await db.User.findAll({
                include: [{ association: 'role' }]
            });
            res.render('users/userList', { users });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error loading users');
        }
    },

    userDelete: async (req, res) => {
        try {
            const userId = req.params.id;
            // No permitir que el admin se borre a sí mismo por accidente
            if (userId == req.session.userLogged.id) {
                return res.redirect('/admin/users');
            }

            await db.User.destroy({ where: { id: userId } });
            res.redirect('/admin/users');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error deleting user');
        }
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

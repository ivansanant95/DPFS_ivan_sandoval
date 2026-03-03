const path = require('path');
const fs = require('fs');

const db = require('../database/models');

async function userLoggedMiddleware(req, res, next) {
    try {
        // Por defecto asumo que nadie está logueado en las vistas
        res.locals.isLogged = false;

        // Verificar si existe la cookie de recordarme y la sesión no fue asignada
        let emailInCookie = req.cookies.userEmail;

        if (emailInCookie && !req.session.userLogged) {
            // Buscar el usuario asíncronamente en la BD usando Sequelize
            let userFromCookie = await db.User.findOne({
                where: { email: emailInCookie }
            });

            // Si el usuario existe en BD debido a la cookie, lo subo a Session fantasma mappando campos
            if (userFromCookie) {
                req.session.userLogged = {
                    id: userFromCookie.id,
                    firstName: userFromCookie.first_name,
                    lastName: userFromCookie.last_name,
                    email: userFromCookie.email,
                    phone: userFromCookie.phone,
                    role_id: userFromCookie.role_id,
                    image: userFromCookie.image
                };
            }
        }

        // Si efectivamente hay un usuario en sesión (ya sea por login normal o por la cookie recién leída)
        if (req.session.userLogged) {
            res.locals.isLogged = true; // Variable global para usar en cualquier vista (Header)
            res.locals.userLogged = req.session.userLogged; // Toda la data del usuario para las vistas
        }

        next();
    } catch (error) {
        console.error("Error en Middleware de Usuario:", error);
        next(); // Con o sin error de BD, dejamos navegar al usuario invitándolo a la página base
    }
}

module.exports = userLoggedMiddleware;

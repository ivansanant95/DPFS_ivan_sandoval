const path = require('path');
const fs = require('fs');

function userLoggedMiddleware(req, res, next) {
    // Por defecto asumo que nadie está logueado en las vistas
    res.locals.isLogged = false;

    // Verificar si existe la cookie de recordarme
    let emailInCookie = req.cookies.userEmail;

    if (emailInCookie) {
        // Buscar el usuario en la BD
        const usersFilePath = path.join(__dirname, '../data/users.json');
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        let userFromCookie = users.find(user => user.email === emailInCookie);

        // Si el usuario existe, lo subo a Session fantasma
        if (userFromCookie) {
            delete userFromCookie.password;
            req.session.userLogged = userFromCookie;
        }
    }

    // Si efectivamente hay un usuario en sesión (ya sea por login normal o por la cookie recién leída)
    if (req.session.userLogged) {
        res.locals.isLogged = true; // Variable global para usar en cualquier vista (Header)
        res.locals.userLogged = req.session.userLogged; // Toda la data del usuario para las vistas
    }

    next();
}

module.exports = userLoggedMiddleware;

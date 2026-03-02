function guestMiddleware(req, res, next) {
    // Si la sesión existe, es decir, YA está logueado, redirigir a su perfil
    if (req.session.userLogged) {
        return res.redirect('/profile');
    }
    // Si NO está logueado, pasa a la ruta que pidió (login o register)
    next();
}

module.exports = guestMiddleware;

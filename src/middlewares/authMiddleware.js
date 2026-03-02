function authMiddleware(req, res, next) {
    // Si la sesión NO existe, redirigir al Login
    if (!req.session.userLogged) {
        return res.redirect('/login');
    }
    // Si se tiene sesión iniciada, pasa a la ruta restringida (ej: El Perfil)
    next();
}

module.exports = authMiddleware;

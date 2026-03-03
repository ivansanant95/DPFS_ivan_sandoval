const adminMiddleware = (req, res, next) => {
    // Chequea si el usuario es admin
    if (req.session.userLogged && req.session.userLogged.role_id === 1) {
        return next();
    }

    // Si no es admin, Redirigir al Home
    return res.redirect('/');
};

module.exports = adminMiddleware;

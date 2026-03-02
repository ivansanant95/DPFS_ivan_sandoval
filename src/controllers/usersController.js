const usersController = {
    // Renderiza la vista de Login
    login: (req, res) => {
        res.render('users/login');
    },

    // Renderiza la vista de Registro
    register: (req, res) => {
        res.render('users/register');
    }
};

module.exports = usersController;

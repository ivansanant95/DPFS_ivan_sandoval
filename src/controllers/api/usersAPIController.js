const db = require('../../database/models');

const usersAPIController = {
    list: async (req, res) => {
        try {
            const users = await db.User.findAll({
                attributes: ['id', 'first_name', 'last_name', 'email'] // Traemos solo lo básico de SQL
            });

            // Armamos la respuesta con los requerimientos específicos (name, detail)
            const usersSanitized = users.map(user => {
                return {
                    id: user.id,
                    name: `${user.first_name} ${user.last_name}`,
                    email: user.email,
                    detail: `/api/users/${user.id}`
                }
            });

            return res.status(200).json({
                count: users.length,
                users: usersSanitized
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error del servidor buscando usuarios' });
        }
    },

    detail: async (req, res) => {
        try {
            const user = await db.User.findByPk(req.params.id, {
                attributes: { exclude: ['password'] } // Sensitivo: Nunca exponer password de la BD
            });

            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            // Agregamos el campo custom "image" con la ruta absoluta local
            const userRes = {
                ...user.dataValues,
                image: `/images/users/${user.image}`
            };

            return res.status(200).json(userRes);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error del servidor buscando el usuario' });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            // 1. Validar que vengan los datos
            if (!email || !password) {
                return res.status(400).json({ success: false, msg: 'Email y password requeridos' });
            }

            // 2. Buscar usuario
            const user = await db.User.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({ success: false, msg: 'Credenciales inválidas' });
            }

            // 3. Chequear el password con bcrypt
            const bcrypt = require('bcryptjs');
            const isMatch = bcrypt.compareSync(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ success: false, msg: 'Credenciales inválidas' });
            }

            // 4. Chequear que sea Admin (rol 1)
            if (user.role_id !== 1) {
                return res.status(403).json({ success: false, msg: 'Acceso denegado. Se requiere rol de Administrador.' });
            }

            // 5. Login Exitoso (Devolvemos Token Simulado o Info de usuario)
            return res.status(200).json({
                success: true,
                user: {
                    id: user.id,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    email: user.email,
                    role_id: user.role_id,
                    image: user.image
                }
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, msg: 'Error de validación del servidor' });
        }
    }
};

module.exports = usersAPIController;

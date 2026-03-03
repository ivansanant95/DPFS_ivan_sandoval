const db = require('../../database/models');

const servicesAPIController = {
    list: async (req, res) => {
        try {
            const services = await db.Service.findAll();

            const servicesSanitized = services.map(service => {
                return {
                    id: service.id,
                    name: service.name,
                    description: service.description,
                    price: service.price,
                    estimated_time: service.estimated_time,
                    image: `/images/services/${service.image}`,
                    detail: `/api/services/${service.id}`
                }
            });

            return res.status(200).json({
                count: services.length,
                services: servicesSanitized,
                status: 200
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error del servidor buscando servicios' });
        }
    },

    detail: async (req, res) => {
        try {
            const service = await db.Service.findByPk(req.params.id);

            if (!service) {
                return res.status(404).json({ error: 'Servicio no encontrado' });
            }

            const serviceRes = {
                ...service.dataValues,
                image: `/images/services/${service.image}`
            };

            return res.status(200).json({
                data: serviceRes,
                status: 200
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error del servidor buscando el servicio' });
        }
    }
};

module.exports = servicesAPIController;

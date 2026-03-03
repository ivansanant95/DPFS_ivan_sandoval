const db = require('../database/models');

const servicesController = {
    // Lista todos los servicios técnicos
    list: async (req, res) => {
        try {
            const services = await db.Service.findAll();
            res.render('services/serviceList', {
                title: 'Servicio Técnico - Reparatech',
                services: services
            });
        } catch (error) {
            console.error('Error obteniendo el listado de servicios:', error);
            res.status(500).send('Hubo un error al procesar tu solicitud');
        }
    },

    // Muestra el detalle de un servicio técnico
    detail: async (req, res) => {
        try {
            const serviceId = req.params.id;
            const service = await db.Service.findByPk(serviceId);

            if (!service) {
                return res.status(404).render('not-found', { title: 'Servicio no encontrado' }); // Asegurar que exista vista 404
            }

            res.render('services/serviceDetail', {
                title: `${service.name} - Reparatech`,
                service: service
            });
        } catch (error) {
            console.error('Error obteniendo el detalle del servicio:', error);
            res.status(500).send('Hubo un error al procesar tu solicitud');
        }
    }
};

module.exports = servicesController;

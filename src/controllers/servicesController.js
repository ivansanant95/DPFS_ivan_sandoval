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
    },

    // Muestra el formulario de creación (Solo Admin)
    create: (req, res) => {
        res.render('services/serviceCreate', {
            title: 'Crear Nuevo Servicio - Reparatech'
        });
    },

    // Procesa la creación de un nuevo servicio (Solo Admin)
    store: async (req, res) => {
        const { validationResult } = require('express-validator');
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render('services/serviceCreate', {
                title: 'Crear Nuevo Servicio - Reparatech',
                errors: errors.mapped(),
                oldData: req.body
            });
        }

        try {
            const { name, description, estimated_time, price, discount } = req.body;

            await db.Service.create({
                name,
                description,
                estimated_time,
                price,
                discount: discount || 0,
                image: req.file ? req.file.filename : 'default-service.png'
            });

            res.redirect('/services');
        } catch (error) {
            console.error('Error al crear el servicio:', error);
            res.status(500).send('Hubo un error al procesar la creación del servicio');
        }
    },

    // Muestra el formulario de edición (Solo Admin)
    edit: async (req, res) => {
        try {
            const service = await db.Service.findByPk(req.params.id);
            if (!service) {
                return res.status(404).render('not-found', { title: 'Servicio no encontrado' });
            }
            res.render('services/serviceEdit', {
                title: 'Editar Servicio - Reparatech',
                service: service
            });
        } catch (error) {
            console.error('Error al cargar edición del servicio:', error);
            res.status(500).send('Hubo un error al procesar tu solicitud');
        }
    },

    // Procesa la actualización de un servicio (Solo Admin)
    update: async (req, res) => {
        const { validationResult } = require('express-validator');
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render('services/serviceEdit', {
                title: 'Editar Servicio - Reparatech',
                errors: errors.mapped(),
                oldData: req.body,
                service: { ...req.body, id: req.params.id } // Mantener ID para el form
            });
        }

        try {
            const service = await db.Service.findByPk(req.params.id);
            if (!service) {
                return res.status(404).render('not-found', { title: 'Servicio no encontrado' });
            }

            const { name, description, estimated_time, price, discount } = req.body;

            await db.Service.update({
                name,
                description,
                estimated_time,
                price,
                discount: discount || 0,
                image: req.file ? req.file.filename : service.image
            }, {
                where: { id: req.params.id }
            });

            res.redirect(`/services/${req.params.id}`);
        } catch (error) {
            console.error('Error al actualizar el servicio:', error);
            res.status(500).send('Hubo un error al procesar la actualización del servicio');
        }
    },

    // Elimina un servicio (Solo Admin)
    destroy: async (req, res) => {
        try {
            await db.Service.destroy({
                where: { id: req.params.id }
            });
            res.redirect('/services');
        } catch (error) {
            console.error('Error al eliminar el servicio:', error);
            res.status(500).send('Hubo un error al procesar la eliminación del servicio');
        }
    }
};

module.exports = servicesController;

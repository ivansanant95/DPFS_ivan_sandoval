const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/servicesController');

// Listado de Servicios Técnicos
router.get('/services', servicesController.list);

// Detalle de un Servicio Técnico puntual (para contratación)
router.get('/services/:id', servicesController.detail);

module.exports = router;

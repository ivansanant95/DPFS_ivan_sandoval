const express = require('express');
const router = express.Router();
const servicesAPIController = require('../../controllers/api/servicesAPIController');

// Rutas de API de Servicios
router.get('/', servicesAPIController.list);
router.get('/:id', servicesAPIController.detail);

module.exports = router;

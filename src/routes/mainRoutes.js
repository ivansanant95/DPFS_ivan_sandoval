const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

// Ruta principal (Home)
router.get('/', mainController.index);

module.exports = router;

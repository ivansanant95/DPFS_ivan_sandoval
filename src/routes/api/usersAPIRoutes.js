const express = require('express');
const router = express.Router();
const usersAPIController = require('../../controllers/api/usersAPIController');

// Rutas /api/users
router.get('/', usersAPIController.list);
router.post('/login', usersAPIController.login);
router.get('/:id', usersAPIController.detail);

module.exports = router;

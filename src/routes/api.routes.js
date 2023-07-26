const express = require('express');
const router = express.Router();
const controller = require('../controllers/api.controller');

// USUARIOS
// GET /api/user (obtener todos los usuarios)
router.get('/api/user', controller.getUserApi);

// GET /api/user/:username (obtener un usuario)
router.get('/api/user/:username', controller.getOneUserApi);

// POST /api/user (crear un usuario)
router.post('/api/user', controller.postUserApi);

// PUT /api/user/:username (editar usuario)
router.put('/api/user/:username', controller.putUserApi);

// GET /api/contact (obtener todos los contactos)
router.get('/api/contact', controller.getContactsApi);

// GET /api/contact/:id (obtener un contacto por id)
router.get('/api/contact/:id', controller.getContactIdApi);

// GET /api/contact/user/:username (obtener los contactos por username)
router.get('/api/contact/user/:username', controller.getContactUsernameApi);

// POST /api/contact (crear un nuevo contacto)
router.post('/api/contact', controller.postContactApi);

module.exports = router;

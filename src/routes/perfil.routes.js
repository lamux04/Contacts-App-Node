const express = require('express');
const router = express.Router();

const controller = require('../controllers/perfil.controller');

router.get('/perfil', controller.getPerfil);

module.exports = router;

const express = require('express');
const router = express.Router();
const controller = require('../controllers/home.controller');

// HOME GET
router.get('/home', controller.getHome);

// APPEND POST
router.post('/append', controller.postAppend);

// DELETE POST
router.post('/delete/:id', controller.postRemove);

module.exports = router;

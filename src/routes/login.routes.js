const express = require('express');
const router = express.Router();
const controller = require('../controllers/login.controller');

// GET request /login
router.get('/login', controller.getLogin);

// GET request /signup
router.get('/signup', controller.getSignup);

// POST reques /signup
router.post('/signup', controller.postSignup);

module.exports = router;

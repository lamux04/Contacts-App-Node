const express = require('express');
const router = express.Router();
const controller = require('../controllers/login.controller');

// GET request /login
router.get('/login', controller.getLogin);

// POST request /login
router.post('/login', controller.postLogin);

// GET request /signup
router.get('/signup', controller.getSignup);

// POST reques /signup
router.post('/signup', controller.postSignup);

// POST request /logout
router.post('/logout', controller.postLogout);

module.exports = router;

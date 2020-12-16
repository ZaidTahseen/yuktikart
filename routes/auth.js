const express = require('express');

const authController = require('../controller/controller_auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.get('/logout', authController.postLogout);

router.get('/signup', authController.getSignup);

router.post('/signup', authController.postSignup);






module.exports = router
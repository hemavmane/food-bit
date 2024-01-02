const express = require('express');
const registerController = require('../Controller/auth');

const router = express.Router();

// Define a route for user signup
router.post('/signup', registerController.signupController);

module.exports = router;

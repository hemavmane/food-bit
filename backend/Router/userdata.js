const express = require('express');
const userDataControllers = require('../Controller/userData');

const router = express.Router();

// Define a route for user signup
router.post('/details', userDataControllers.addUserData);

module.exports = router;

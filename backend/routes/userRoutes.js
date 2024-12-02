const express = require('express');
const { signup, login } = require('../controllers/userController'); // Ensure these are properly defined in userController
const router = express.Router();

// Use signup and login functions from userController
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;

const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/usercontroller.cjs');
// Existing signup and login routes
router.post('/signup', usercontroller.signup);
router.post('/login', usercontroller.login);

// OAuth routes
module.exports = router;

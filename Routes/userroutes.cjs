const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/usercontroller.cjs');
// Existing signup and login routes
router.post('/signup', usercontroller.signup);
router.post('/login', usercontroller.login);
router.get('/:name',usercontroller.getUserByUsername);
router.put('/:userId/updatecartdata', usercontroller.updatecartdata);
// Assuming you have an 'authMiddleware' to handle user authentication
router.get('/:userId/cart', usercontroller.getCartItems);

module.exports = router;

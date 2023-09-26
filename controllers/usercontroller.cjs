const bcrypt = require('bcryptjs');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const User = require('../models/usermodel.cjs'); // Replace with the actual path to your User model
const validator = require('validator');

exports.signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        next(error);
    }
};


exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed. User not found.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // Generate a JWT token and set it as a cookie
            const token = jwt.sign({ userId: user._id },process.env.JWT_SECRET, { expiresIn: '1h' });
            res.cookie('jwt', token, { httpOnly: false });

            res.status(200).json({ message: 'Authentication successful', user });
        } else {
            res.status(401).json({jwt });
        }
    } catch (error) {
        next(error);
    }
};
exports.getUserByUsername = async (req, res, next) => {
    const username = req.params.username; 
    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send the user data as a response
        res.status(200).json({ user });
    } catch (error) {
        next(error);
    }
};
exports.updatecartdata = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { cartId, quantity } = req.body;
  
      // Find the user by userId
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the cartId already exists in the user's cart
      const existingCartItemIndex = user.cart.findIndex(
        (item) => item.cartId.toString() === cartId
      );
  
      if (existingCartItemIndex !== -1) {
        // If the cartId already exists in the cart, update its quantity
        user.cart[existingCartItemIndex].quantity += quantity;
      } else {
        // If the cartId does not exist in the cart, add it with the specified quantity
        user.cart.push({ cartId, quantity });
      }
  
      await user.save();
  
      res.status(200).json({ message: 'Cart updated successfully', user });
    } catch (error) {
      next(error);
    }
  };
  
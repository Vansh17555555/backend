const bcrypt = require('bcryptjs');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const {User,OauthUser} = require('../models/usermodel.cjs'); // Replace with the actual path to your User model
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
            res.status(401).json({ message: 'Authentication failed. Incorrect password.' });
        }
    } catch (error) {
        next(error);
    }
};

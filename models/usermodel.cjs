const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

// Define the base user schema for email/password-based users
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  creditPoints: {
    type: Number,
    default: 0,
  },
  recycledDevices: [
    {
      deviceModel: String,
      metalRecoveryPoints: Number,
    },
  ],
});

// Define the OAuth-specific schema for OAuth-based users
// Create the base 'User' model for email/password-based users
const User = mongoose.model('User', userSchema);

// Create the 'OAuthUser' model for OAuth-based users, inheriting from 'User'


module.exports = User;


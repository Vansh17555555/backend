const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const UnifiedData=require('./../models/metalmodel.cjs');
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
  cart: [
    {
      cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UnifiedData',
        autopopulate: true, // Reference to the Material model
      },
      quantity: {
        type: Number,
        default: 0, // Default quantity is 0 if not specified
      },
    },
  ]
});

userSchema.set('strictPopulate', false); // Allow populating undefined paths

// Define the OAuth-specific schema for OAuth-based users
// Create the base 'User' model for email/password-based users
const User = mongoose.model('User', userSchema);

// Create the 'OAuthUser' model for OAuth-based users, inheriting from 'User'


module.exports = User;


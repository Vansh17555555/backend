const mongoose = require('mongoose');

// Define the OAuth-specific schema for OAuth-based users
const oauthSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  displayName: String,
  givenName: String,
  familyName: String,
  photoUrl: String,
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

// Create the 'OAuthUser' model for OAuth-based users
const OAuthUser = mongoose.model('OAuthUser', oauthSchema);

module.exports = OAuthUser;

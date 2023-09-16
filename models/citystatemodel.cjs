const fs = require('fs');
const mongoose = require('mongoose');

// Define the Mongoose model for the data
const stateSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true
  },
  cities: [
    {
      type: String,
      required: true
    }
  ]
});

const State2 = mongoose.model('State2', stateSchema);

// Export the State model
module.exports = State2;
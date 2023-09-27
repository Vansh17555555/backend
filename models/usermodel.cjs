const mongoose=require('mongoose');
// Define the cart item schema
const cartItemSchema = new mongoose.Schema({
  cartId: {
    type: mongoose.Schema.ObjectId, // Corrected from mongoose.Schema.Types.name
  },
  quantity: {
    type: Number,
    default: 0,
  },
});
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
  // ... (other fields)
  cart: [cartItemSchema], // Use the cartItemSchema for cart items
});

// Enable autopopulation for the cart field
userSchema.plugin(require('mongoose-autopopulate'));

// Create a User model using the userSchema
const User = mongoose.model('User', userSchema);

module.exports = User;

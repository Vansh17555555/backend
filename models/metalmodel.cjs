const mongoose = require('mongoose');

// Define the schema for the data structure
const metalSchema = new mongoose.Schema({
  Gold: Number,
  Silver: Number,
  Palladium: Number,
  Platinum: Number,
});

const itemSchema = new mongoose.Schema({
  name: String,
  img:String,
  data: metalSchema,
});

const subcategorySchema = new mongoose.Schema({
  name: String,
  img:String,
  data: [itemSchema],
});

const categorySchema = new mongoose.Schema({
  category: String,
  img:String,
  subcategories: [subcategorySchema],
});

// Create a model using the schema
const UnifiedData = mongoose.model('UnifiedData', categorySchema);

module.exports = UnifiedData;

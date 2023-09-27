const fs = require('fs');
const mongoose = require('mongoose');
const MetalModel = require();

// Provide your MongoDB Atlas connection string here
const DB = 'mongodb+srv://Vansh:12345678Rt.@cluster0.j5sgoz0.mongodb.net/';

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connection successful!'))
  .catch((err) => console.error('DB connection failed!', err)); // Handle connection errors

// READ JSON FILE

// Read the JSON file
const rawData = fs.readFileSync(`./rewardsystem/materials.json`, 'utf-8'); // Update the path to match your file location
const jsonData = JSON.parse(rawData);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await MetalModel.insertMany(jsonData);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.error('Data import failed:', err);
  }
  mongoose.connection.close(); // Close the database connection when done
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await MetalModel.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.error('Data deletion failed:', err);
  }
  mongoose.connection.close(); // Close the database connection when done
};

// Check for the command line argument
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
} else {
  console.log('Usage: node script.js --import (to import data) or --delete (to delete data)');
}

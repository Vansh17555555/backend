const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Call dotenv.config() without parentheses to load environment variables
dotenv.config({ path: './config.env' });

const app = require('./app.cjs');
console.log(process.env.JWT_SECRET);

const uri = 'mongodb+srv://Vansh:12345678Rt.@cluster0.j5sgoz0.mongodb.net/';
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('Connected to MongoDB');
    console.log(process.env.NODE_ENV);
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

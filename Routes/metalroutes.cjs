const express = require('express');
const model = require('../models/metalmodel.cjs');

const router = express.Router();

// Route to get all categories
router.get('/categories', async (req, res) => {
  try {
    const data = await model.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get subcategories by category
router.get('/categories/:category/subcategories', async (req, res) => {
  const category = req.params.category;
  try {
    const data = await model.findOne({ 'category':category });
    console.log(data)
    if (!data) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const subcategories = data.subcategories.map((sub) => ({
      name: sub.name,
      data: sub.data,
    }));

    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get category and subcategory data
// Route to get all items data within a subcategory
router.get('/categories/:category/:subcategory', async (req, res) => {
  const category = req.params.category;
  const subcategory = req.params.subcategory;

  try {
    // Find a document where 'category' matches the provided category
    // and 'subcategories.name' matches the provided subcategory
    const data = await model.findOne({
      'category': category,
      'subcategories.name': subcategory,
    });

    if (!data) {
      return res.status(404).json({ message: 'Category or subcategory not found' });
    }

    const filteredData = [];

    for (const subcategoryItem of data.subcategories) {
      if (subcategoryItem.name === subcategory) {
        filteredData.push(subcategoryItem.data);
      }
    }

    if (!filteredData || filteredData.length === 0) {
      return res.status(404).json({ message: 'No items found in the subcategory' });
    }

    res.status(200).json(filteredData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Route to get item data within a subcategory
router.get('/categories/:category/:subcategory/:itemName', async (req, res) => {
  const category = req.params.category;
  const subcategory = req.params.subcategory;
  const itemName = req.params.itemName;

  try {
    const data = await model.findOne({
      'subcategories.name': subcategory,
      'subcategories.data.name': itemName,
    });

    if (!data) {
      return res.status(404).json({ message: 'Category, subcategory, or item not found' });
    }

    const filteredData = [];

    for (const subcategoryItem of data.subcategories) {
      if (subcategoryItem.name === subcategory) {
        const itemData = subcategoryItem.data.find((item) => item.name === itemName);
        if (itemData) {
          filteredData.push({ subcategory: subcategoryItem.name, itemData });
        }
      }
    }

    if (filteredData.length === 0) {
      return res.status(404).json({ message: 'Item not found in the subcategory' });
    }

    res.status(200).json(filteredData);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;

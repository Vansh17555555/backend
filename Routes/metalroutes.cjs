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
    const data = await model.findOne({ category });

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
router.get('/categories/:category/subcategories/:subcategory', async (req, res) => {
    const category = req.params.category;
    const subcategory = req.params.subcategory;
    try {
      const data = await model.findOne({
        'subcategories.name': category,
        'subcategories.data.name': subcategory,
      });
  
      if (!data) {
        return res.status(404).json({ message: 'Category or subcategory not found' });
      }
  
      const subcategoryData = data.subcategories.find((sub) => sub.name === category);
  
      if (!subcategoryData) {
        return res.status(404).json({ message: 'Subcategory not found' });
      }
  
      const allItemData = subcategoryData.data;
  
      if (!allItemData || allItemData.length === 0) {
        return res.status(404).json({ message: 'No items found in the subcategory' });
      }
  
      res.status(200).json(allItemData);
    } catch (error) {
      res.status(500).json({ message: err });
    }
  });
  

// Route to get item data within a subcategory
router.get('/categories/:category/subcategories/:subcategory/items/:itemName', async (req, res) => {
  const category = req.params.category;
  const subcategory = req.params.subcategory;
  const itemName = req.params.itemName;
  try {
    const data = await model.findOne({
      'subcategories.name': category,
      'subcategories.data.name': subcategory,
    });

    if (!data) {
      return res.status(404).json({ message: 'Category or subcategory not found' });
    }

    const subcategoryData = data.subcategories.find((sub) => sub.name === category);

    if (!subcategoryData) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    const itemData = subcategoryData.data.find((item) => item.name === itemName);

    if (!itemData) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json(itemData);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

const express = require('express');
const model = require('../models/metalmodel.cjs');

exports.getAllCategories = async (req, res) => {
  try {
    const data = await model.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getSubcategoriesByCategory = async (req, res) => {
  const category = req.params.category;
  try {
    const data = await model.findOne({ 'subcategories.name': category });

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
};

exports.getCategoryAndSubcategoryData = async (req, res) => {
  const category = req.params.category;
  const subcategory = req.params.subcategory;
  const itemName = req.params.itemName; // Add item name parameter

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

    const itemData = subcategoryData.data.find((item) => item.name === itemName); // Find the item by name

    if (!itemData) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json(itemData);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

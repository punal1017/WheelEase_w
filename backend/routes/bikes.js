const express = require('express');
const router = express.Router();
const Bike = require('../models/Bike');

// Get all bikes
router.get('/', async (req, res) => {
  try {
    const bikes = await Bike.find();
    res.json(bikes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a bike (admin only)
router.post('/', async (req, res) => {
  const { name, type, price, brand, image, stock } = req.body;
  try {
    const bike = new Bike({ name, type, price, brand, image, stock });
    await bike.save();
    res.status(201).json(bike);
  } catch (error) {
    res.status(400).json({ message: 'Error adding bike' });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Bike = require('../models/Bike');
const auth = require('../middleware/auth');

// Place an order
router.post('/', auth, async (req, res) => {
  const { bikes } = req.body; // Array of { bikeId, quantity }
  try {
    let totalPrice = 0;
    const orderBikes = [];

    for (const item of bikes) {
      const bike = await Bike.findById(item.bikeId);
      if (!bike || bike.stock < item.quantity) {
        return res.status(400).json({ message: `Bike ${bike.name} out of stock` });
      }
      totalPrice += bike.price * item.quantity;
      orderBikes.push({ bike: bike._id, quantity: item.quantity });
      bike.stock -= item.quantity;
      await bike.save();
    }

    const order = new Order({
      user: req.user.id,
      bikes: orderBikes,
      totalPrice,
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: 'Error placing order' });
  }
});

module.exports = router;
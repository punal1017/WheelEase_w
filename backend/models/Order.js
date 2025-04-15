const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bikes: [
    {
      bike: { type: mongoose.Schema.Types.ObjectId, ref: 'Bike', required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
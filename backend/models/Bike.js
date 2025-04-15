const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['mountain', 'road', 'city'], required: true },
  price: { type: Number, required: true },
  brand: { type: String, required: true }, // Added brand field
  image: { type: String, required: true },
  stock: { type: Number, required: true, min: 0 },
});

module.exports = mongoose.model('Bike', bikeSchema);
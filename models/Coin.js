const mongoose = require('mongoose');

// Define a schema for the coins
const coinSchema = new mongoose.Schema({
  id: { type: String, required: true },
  symbol: { type: String, required: true },
  name: { type: String, required: true },
});

// Create a model for the "coins" collection
const Coin = mongoose.model('Coin', coinSchema);

module.exports = Coin; // If you're using a separate file for the model

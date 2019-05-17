var mongoose = require('mongoose');
var Size = require('./size.model');

const cartSchema = new mongoose.Schema({
    userId: String,
    items: [{productId: mongoose.Schema.Types.ObjectId, pack: Number, moq: Number,
      ratioQty: Number, size: [Size]}]
  });

  const Cart = mongoose.model('cart', cartSchema);
  module.exports = Cart;

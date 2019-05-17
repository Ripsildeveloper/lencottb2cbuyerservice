var mongoose = require('mongoose');

const cardDetailsSchema = new mongoose.Schema({
    cardName: String,
    cardNumber:Number,
    expiryMonth:Number,
    expiryYear:Number
  });

module.exports = cardDetailsSchema;

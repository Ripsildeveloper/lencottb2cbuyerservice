var mongoose = require('mongoose');

const sizeModelSchema = new mongoose.Schema({
    sizeName: String,
    skuCode: String,
    sizeQty: Number,
    ratio: Number
});

module.exports = sizeModelSchema;
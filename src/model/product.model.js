var mongoose = require('mongoose');
var size = require('./size.model');

const ProductSchema = new mongoose.Schema({
    productId: String,
    productTitle: String,
    productName: String,
    productDescription: String,
    shortDescription: String,
    price: Number,
    color: String,
    styleCode: String,
    productImageName: [String],
    superCategoryId: String,
    mainCategoryId: String,
    subCategoryId: String,
    bulletPoints: String,
    spPrice: Number,
    mrpPrice: Number,
    // details
    material: String,
    weight: String,
    height: String,
    occassion: String,

    //size
    size: [size]

});

const Product = mongoose.model('product', ProductSchema);
module.exports = Product;

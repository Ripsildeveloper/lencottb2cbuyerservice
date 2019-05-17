var mongoose = require('mongoose');
var SubCategory = require('./subCategory.model');

const MainCategorySchema = new mongoose.Schema({
    mainCategoryName: String,
    mainCategoryDescription: String,
    mainCategoryImageName : String,
    subCategory: [SubCategory]
});
module.exports = MainCategorySchema;

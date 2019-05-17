var mongoose = require('mongoose');
var MainCategory = require('./mainCategory.model');

const SuperCategorySchema = new mongoose.Schema({
    
    categoryName: String,
    categoryDescription: String,
    categoryImageName: String,
    mainCategory:[MainCategory]
});

const Category = mongoose.model('category', SuperCategorySchema);
module.exports = Category;



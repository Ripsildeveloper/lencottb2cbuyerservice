var mongoose = require('mongoose');

const SubCategorySchema = new mongoose.Schema({
    subCategoryName: String,
    subCategoryDescription: String
});

module.exports = SubCategorySchema;

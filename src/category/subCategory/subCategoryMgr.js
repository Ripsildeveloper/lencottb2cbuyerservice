var subCategoryDA = require('./subCategoryDA')




exports.findSubCategory = function (req, res) {
    try {
        subCategoryDA.findSubCategory(req, res);
    } catch (error) {
        console.log(error);
    }
}
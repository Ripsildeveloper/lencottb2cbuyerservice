var mainCategoryDA = require('../../category/mainCategory/mainCategoryDA')

exports.getMainCategory = function (req, res) {
    try {
        mainCategoryDA.getMainCategory(req, res);
    } catch (error) {
        console.log(error);
    }
}

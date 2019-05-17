var superCategoryDA = require('../../category/superCategory/superCategoryDA');
var SuperCategory = require('../../model/superCategory.model');



exports.superCategoryShow = function (req, res) {
    try {
        superCategoryDA.superCategoryShow(req, res);
    } catch (error) {
        console.log(error);
    }
}
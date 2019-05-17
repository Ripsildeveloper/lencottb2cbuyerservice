'use strict';
var superCategoryMgr = require('./superCategory/superCategoryMgr');
var mainCategoryMgr = require('./mainCategory/mainCategoryMgr');
var subCategoryMgr = require('./subCategory/subCategoryMgr');

module.exports = function (app) {
    // super category
   

    app.route('/categoryDetails')
        .get(superCategoryMgr.superCategoryShow);
   
    // main category

    app.route('/superCategorydetail/:id')
        .get(mainCategoryMgr.getMainCategory);


    // sub category

    app.route('/category/:categoryId/mainCategory/:mainCategoryId')
        .get(subCategoryMgr.findSubCategory);
}

'use strict';
var viewProductMgr = require('./view-product/viewProductMgr');


module.exports = function (app) {
/* 
    app.route('/product')
        .get(productMgr.getProduct); */
    app.route('/categoryDetails/:id')
        .get(viewProductMgr.categoryProduct);


    // single product - view
    app.route('/singleproduct/:id')
        .get(viewProductMgr.singleProduct);
    // realted products
    app.route('/relatedproducts/:stylecode/product/:id')
        .get(viewProductMgr.relatedProducts);

    // price low - to high

    app.route('/lowcategoryDetails/:id')
        .get(viewProductMgr.lowToHigh);

    app.route('/highcategoryDetails/:id')
        .get(viewProductMgr.highToLow);

    // filter 
    app.route('/productSettings')
     .get(viewProductMgr.getProductSettings);

    app.route('/category/:id')
        .put(viewProductMgr.filterByPrice);

    app.route('/categoryColor/:id')
        .put(viewProductMgr.filterByColor);
}
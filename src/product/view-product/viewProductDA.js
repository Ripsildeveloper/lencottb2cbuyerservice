var Product = require('../../model/product.model');
var appSetting = require('../../config/appSetting');
var ProductDetails= require('../../model/productDetails.model');

exports.viewProducts = function (req, res) {
    Product.find({
        'subCategoryId': req.params.subcategoryid

    }, function (err, product) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving products."
            });
        } else {
            var productLength = product.length - 1;
            for (var i = 0; i <= productLength; i++) {
                var productImages = product[i].productImageName.sort();
                var productImageLength = productImages.length - 1;
                for (var j = 0; j <= productImageLength; j++) {
                    product[i].productImageName[j] = appSetting.productServerPath + product[i].styleCode + '/' + product[i].productImageName[j];
                }
            }
            res.status(200).json(product);
        }
    })
}


exports.viewSingleProducts = function (req, res) {
    Product.findById(req.params.productId,
        function (err, product) {
            if (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving products."
                });
            } else {

                var productImages = product.productImageName.sort();
                var productImageLength = productImages.length - 1;
                for (var j = 0; j <= productImageLength; j++) {
                    product.productImageName[j] = appSetting.productServerPath + product.styleCode + '/' + product.productImageName[j];

                }
                res.status(200).json(product);
            }
        })
}

exports.categoryProduct = function (req, res) {
    Product.find({
        'subCategoryId': req.params.id
    }).select().exec(function (err, productModel) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving notes."
            });
        } else {
            var productLength = productModel.length - 1;
            for (var i = 0; i <= productLength; i++) {
                var productImages = productModel[i].productImageName.sort();
                var productImageLength = productImages.length - 1;
                for (var j = 0; j <= productImageLength; j++) {
                    productModel[i].productImageName[j] = appSetting.productServerPath + productModel[i].styleCode + '/' + productModel[i].productImageName[j];
                }
            }
            res.json(productModel);
        }
    });
}
exports.singleProduct = function (req, res) {
    Product.find({
        '_id': req.params.id
    }, function (err, productDetails) {
        if (err) {
            res.status(500).json({
                "result": 0
            })
        } else {
            var productDetailsLength = productDetails[0].productImageName.length - 1;
            for (var i = 0; i <= productDetailsLength; i++) {
                productDetails[0].productImageName[i] = appSetting.productServerPath + productDetails[0].styleCode + '/' + productDetails[0].productImageName[i];
            }
            res.status(200).json(productDetails[0]);

        }
    })
}
exports.relatedProducts = function (req, res) {
    Product.find({
        'styleCode': req.params.stylecode,
    }, function (err, productData) {
        if (err) {
            console.log(err);
            res.status(500).json({
                "result": 0
            })
        } else {
            var productLength = productData.length - 1;
            for (var i = 0; i <= productLength; i++) {
                var productImages = productData[i].productImageName.sort();
                var productImageLength = productImages.length - 1;
                for (var j = 0; j <= productImageLength; j++) {
                    productData[i].productImageName[j] = appSetting.productServerPath + productData[i].styleCode + '/' + productData[i].productImageName[j];
                }
            }
            res.status(200).json(productData);

        }
    })
}
exports.lowToHigh = function (req, res) {
    Product.find({
        mainCategory: req.params.id
    }).select().sort({
        price: 1
    }).
    exec(function (err, productModel) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving notes."
            });
        } else {
            var productLength = productModel.length - 1;
            for (var i = 0; i <= productLength; i++) {
                var productImages = productModel[i].productImageName.sort();
                var productImageLength = productImages.length - 1;
                for (var j = 0; j <= productImageLength; j++) {
                    productModel[i].productImageName[j] = appSetting.productServerPath + productModel[i].styleCode + '/' + productModel[i].productImageName[j];
                }
            }
            res.json(productModel);
        }
    });
}


exports.highToLow = function (req, res) {
    Product.find({
        mainCategory: req.params.id
    }).select().sort({
        price: -1
    }).
    exec(function (err, productModel) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving notes."
            });
        } else {
            var productLength = productModel.length - 1;
            for (var i = 0; i <= productLength; i++) {
                var productImages = productModel[i].productImageName.sort();
                var productImageLength = productImages.length - 1;
                for (var j = 0; j <= productImageLength; j++) {
                    productModel[i].productImageName[j] = appSetting.productServerPath + productModel[i].styleCode + '/' + productModel[i].productImageName[j];
                }
            }
            res.json(productModel);
        }
    });
}

exports.filterByPrice = function (req, res) {
    Product.find({
        subCategoryId: req.params.id,
        price: {"$gte": req.body.minimumPriceFilter, "$lte": req.body.maximumPriceFilter}
    }).select().
    exec(function (err, productModel) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving notes."
            });
        } else {
            var productLength = productModel.length - 1;
            for (var i = 0; i <= productLength; i++) {
                var productImages = productModel[i].productImageName.sort();
                var productImageLength = productImages.length - 1;
                for (var j = 0; j <= productImageLength; j++) {
                    productModel[i].productImageName[j] = appSetting.productServerPath + productModel[i].styleCode + '/' + productModel[i].productImageName[j];
                }
            }
            res.json(productModel);
        }
    });

}
exports.filterByColor = function (req, res) {
    if(req.body.colorFilter !== undefined && 
        (req.body.materialFilter === null || req.body.materialFilter === undefined) && 
       ( (req.body.minimumPriceFilter === null || req.body.minimumPriceFilter === undefined) || 
       (req.body.maximumPriceFilter === null || req.body.maximumPriceFilter === undefined) ) ) { // filter only color
        Product.find({
            subCategoryId: req.params.id,
            color: req.body.colorFilter
        }).select().
        exec(function (err, productModel) {
            if (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving notes."
                });
            } else {
                var productLength = productModel.length - 1;
                for (var i = 0; i <= productLength; i++) {
                    var productImages = productModel[i].productImageName.sort();
                    var productImageLength = productImages.length - 1;
                    for (var j = 0; j <= productImageLength; j++) {
                        productModel[i].productImageName[j] = appSetting.productServerPath + productModel[i].styleCode + '/' + productModel[i].productImageName[j];
                    }
                }
                res.json(productModel);
            }
        });
    } else  if((req.body.colorFilter === null || req.body.colorFilter === undefined) 
    && (req.body.materialFilter !== null) && 
    ( (req.body.minimumPriceFilter === null || req.body.minimumPriceFilter === undefined) || 
    (req.body.maximumPriceFilter === null || req.body.maximumPriceFilter === undefined) ) ) { // filter only for material
        Product.find({
            subCategoryId: req.params.id,
            material:  req.body.materialFilter
        }).select().
        exec(function (err, productModel) {
            if (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving notes."
                });
            } else {
                var productLength = productModel.length - 1;
                for (var i = 0; i <= productLength; i++) {
                    var productImages = productModel[i].productImageName.sort();
                    var productImageLength = productImages.length - 1;
                    for (var j = 0; j <= productImageLength; j++) {
                        productModel[i].productImageName[j] = appSetting.productServerPath + productModel[i].styleCode + '/' + productModel[i].productImageName[j];
                    }
                }
                res.json(productModel);
            }
        });
    }  else if( (req.body.minimumPriceFilter !== undefined && req.body.minimumPriceFilter !== undefined  ) && 
        (req.body.materialFilter === null || req.body.materialFilter === undefined) && 
       ( req.body.colorFilter === null || req.body.colorFilter === undefined ) ) { // filter only price
        Product.find({
            subCategoryId: req.params.id,
            price: {"$gte": req.body.minimumPriceFilter, "$lte": req.body.maximumPriceFilter}
        }).select().
        exec(function (err, productModel) {
            if (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving notes."
                });
            } else {
                var productLength = productModel.length - 1;
                for (var i = 0; i <= productLength; i++) {
                    var productImages = productModel[i].productImageName.sort();
                    var productImageLength = productImages.length - 1;
                    for (var j = 0; j <= productImageLength; j++) {
                        productModel[i].productImageName[j] = appSetting.productServerPath + productModel[i].styleCode + '/' + productModel[i].productImageName[j];
                    }
                }
                res.json(productModel);
            }
        });
    }else  if(req.body.colorFilter !== null && req.body.materialFilter !== null && 
        ( (req.body.minimumPriceFilter === null || req.body.minimumPriceFilter === undefined) || 
       (req.body.maximumPriceFilter === null || req.body.maximumPriceFilter === undefined) )
        ) { // filter for color and material
       Product.find({
            subCategoryId: req.params.id,
           color: req.body.colorFilter,
           material:  req.body.materialFilter
       }).select().
       exec(function (err, productModel) {
           if (err) {
               res.status(500).send({
                   message: "Some error occurred while retrieving notes."
               });
           } else {
               var productLength = productModel.length - 1;
               for (var i = 0; i <= productLength; i++) {
                   var productImages = productModel[i].productImageName.sort();
                   var productImageLength = productImages.length - 1;
                   for (var j = 0; j <= productImageLength; j++) {
                       productModel[i].productImageName[j] = appSetting.productServerPath + productModel[i].styleCode + '/' + productModel[i].productImageName[j];
                   }
               }
               res.json(productModel);
           }
       });
   } else  if(req.body.colorFilter !== null && req.body.minimumPriceFilter !== null &&  req.body.maximumPriceFilter !== null &&
    ( req.body.materialFilter === null || req.body.materialFilter === undefined)    ) { // filter for color and price
   Product.find({
    subCategoryId: req.params.id,
       color: req.body.colorFilter,
       price: {"$gte": req.body.minimumPriceFilter, "$lte": req.body.maximumPriceFilter}
   }).select().
   exec(function (err, productModel) {
       if (err) {
           res.status(500).send({
               message: "Some error occurred while retrieving notes."
           });
       } else {
           var productLength = productModel.length - 1;
           for (var i = 0; i <= productLength; i++) {
               var productImages = productModel[i].productImageName.sort();
               var productImageLength = productImages.length - 1;
               for (var j = 0; j <= productImageLength; j++) {
                   productModel[i].productImageName[j] = appSetting.productServerPath + productModel[i].styleCode + '/' + productModel[i].productImageName[j];
               }
           }
           res.json(productModel);
       }
   });
} else  if(req.body.materialFilter !== null && req.body.minimumPriceFilter !== null &&  req.body.maximumPriceFilter !== null &&
    ( req.body.colorFilter === null || req.body.colorFilter === undefined)    ) { // filter for material and price
   Product.find({
       mainCategory: req.params.id,
       material:  req.body.materialFilter,
       price: {"$gte": req.body.minimumPriceFilter, "$lte": req.body.maximumPriceFilter}
   }).select().
   exec(function (err, productModel) {
       if (err) {
           res.status(500).send({
               message: "Some error occurred while retrieving notes."
           });
       } else {
           var productLength = productModel.length - 1;
           for (var i = 0; i <= productLength; i++) {
               var productImages = productModel[i].productImageName.sort();
               var productImageLength = productImages.length - 1;
               for (var j = 0; j <= productImageLength; j++) {
                   productModel[i].productImageName[j] = appSetting.productServerPath + productModel[i].styleCode + '/' + productModel[i].productImageName[j];
               }
           }
           res.json(productModel);
       }
   });
} else  if(req.body.colorFilter != null && req.body.materialFilter !== null
         && req.body.minimumPriceFilter !== null && req.body.maximumPriceFilter !== null ) { // filter for price, color and material
        Product.find({
            mainCategory: req.params.id,
            color: req.body.colorFilter,
            material:  req.body.materialFilter,
             price: {"$gte": req.body.minimumPriceFilter, "$lte": req.body.maximumPriceFilter}
        }).select().
        exec(function (err, productModel) {
            if (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving notes."
                });
            } else {
                var productLength = productModel.length - 1;
                for (var i = 0; i <= productLength; i++) {
                    var productImages = productModel[i].productImageName.sort();
                    var productImageLength = productImages.length - 1;
                    for (var j = 0; j <= productImageLength; j++) {
                        productModel[i].productImageName[j] = appSetting.productServerPath + productModel[i].styleCode + '/' + productModel[i].productImageName[j];
                    }
                }
                res.json(productModel);
            }
        });
    } 
   
}

exports.getProductSettings = function (req, res) {
    ProductDetails.find({}).select().exec(function (err, productdetails) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving notes."
            });
        } else {
            res.status(200).json(productdetails);
        }
    });
}
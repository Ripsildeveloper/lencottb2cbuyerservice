var SuperCategory = require('../../model/superCategory.model')
var MainCategory = require('../../model/mainCategory.model')
var SubCategory = require('../../model/subCategory.model')

exports.subCategoryInsert = function (req, res) {

    SuperCategory.findById(req.params.superid, function (err, category) {


        var mainCat = category.mainCategory.id(req.params.mainid)

        mainCat.subCategory.push({
            subCategoryName: req.body.subCategoryName,
            subCategoryDescription: req.body.subCategoryDescription
        })

        category.save(function (err, result) {
            if (err) {
                res.status(500).send({
                    "result": 1
                });
            } else {
                res.status(200).json(result)
            }
        });

    });

}


exports.subCategoryDelete = function (req, res) {
    SuperCategory.findById(req.params.categoryId, function (err, category) {
        if (err) {
            res.status(500).send({
                "result": 0
            });
        } else {

            var mainCat = category.mainCategory.id(req.params.mainCategoryId)
            mainCat.subCategory.id(req.params.subCategoryId).remove()
            category.save(function (err, result) {
                if (err) {
                    res.status(500).send({
                        "result": 1
                    });
                } else {
                    SuperCategory.findById(req.params.categoryId, function (err, category) {
                        if (err) {
                            res.status(500).send({
                                "result": 0
                            });
                        } else {
                            var mainCat = category.mainCategory.id(req.params.mainCategoryId)
                
                            res.status(200).json(mainCat);
                        }
                    });
                }
            });

        }
    });


}

exports.subCategoryUpdate = function (req, res) {
    SuperCategory.findById(req.params.categoryId, function (err, category) {
        if (err) {
            res.status(500).send({
                "result": 0
            });
        } else {

            var mainCat = category.mainCategory.id(req.params.mainCategoryId)
            var subCat = mainCat.subCategory.id(req.params.subCategoryId);
            subCat.subCategoryName = req.body.subCategoryName;
            subCat.subCategoryDescription = req.body.subCategoryDescription
            category.save(function (err, result) {
                if (err) {
                    res.status(500).send({
                        "result": 1
                    });
                } else {
                    SuperCategory.findById(req.params.categoryId, function (err, category) {
                        if (err) {
                            res.status(500).send({
                                "result": 0
                            });
                        } else {
                            var mainCat = category.mainCategory.id(req.params.mainCategoryId)
                
                            res.status(200).json(mainCat)
                        }
                    });
                }
            });

        }
    });


}




exports.findSubCategory = function (req, res) {
    SuperCategory.findById(req.params.categoryId, function (err, category) {
        if (err) {
            res.status(500).send({
                "result": 0
            });
        } else {
            var mainCat = category.mainCategory.id(req.params.mainCategoryId)

            res.status(200).json(mainCat)
        }
    });
}
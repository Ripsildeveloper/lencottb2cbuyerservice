'use strict';
var SuperCategory = require('../../model/superCategory.model');
var appSetting = require('../../config/appSetting')

exports.superCategoryShow = function (req, res) {
    SuperCategory.find({}).select().exec(function (err, superCat) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving notes."
            });
        } else {
            var categoryLength = superCat.length - 1;
            for (var i = 0; i <= categoryLength; i++) {
                superCat[i].categoryImageName = appSetting.categoryServerPath + superCat[i].categoryName + '/' + superCat[i].categoryImageName;
            }
            res.status(200).json(superCat);
        }
    });

}

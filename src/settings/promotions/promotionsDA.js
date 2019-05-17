var Promotions = require('./../../model/promotions.model');
var appSetting = require('../../config/appSetting');


exports.getPromotions = function (req, res) {
    Promotions.aggregate([{

        $lookup: {
            "from": "products",
            "localField": "productsID",
            "foreignField": "productId",
            "as": "joinedtable"

        },
    }, {
        $match: {
            "joinedtable": {
                $ne: []
            }
        }
    }]).exec(function (err, promotions) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving notes."
            })
        } else {

            var productLength = promotions.length - 1;
            for (var i = 0; i <= productLength; i++) {
                var joinedTable = promotions[i].joinedtable;
                var joinedTableLength = joinedTable.length - 1;
                for (var j = 0; j <= joinedTableLength; j++) {
                    var productImage = joinedTable[j].productImageName;
                    var productImageLength = productImage.length - 1;;
                    for (var k = 0; k <= productImageLength; k++) {
                        joinedTable[j].productImageName[k] = appSetting.productServerPath + joinedTable[j].styleCode + '/' + joinedTable[j].productImageName[k];
                    }
                }
            }
            res.status(200).json(promotions);


        }
    })
}

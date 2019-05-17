var Ads = require('../../model/ads.model');
var appSetting = require('../../config/appSetting');



exports.getAds = function (req, res) {
    Ads.find({}).select().sort({
        position: 1
    }).exec(function (err, adsImages) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving notes."
            });
        } else {
            var adsLength = adsImages.length -1;
            for(var i =0; i <= adsLength; i++) {
                adsImages[i].adsImageName =  appSetting.adsServerPath + adsImages[i].adsImageName;
            }
            res.status(200).json(adsImages);
        }
    });
}
var Banners = require('./../../model/banner.model');
var appSetting = require('../../config/appSetting');



exports.getBanners = function (req, res) {
    Banners.find({}).select().sort({
        position: 1
    }).exec(function (err, bannerImages) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving notes."
            });
        } else {
            var bannerLength = bannerImages.length -1;
            for(var i =0; i <= bannerLength; i++) {
                bannerImages[i].bannerImage =  appSetting.bannerServerPath + bannerImages[i].bannerImage;
            }
            res.status(200).json(bannerImages);
        }
    });
}
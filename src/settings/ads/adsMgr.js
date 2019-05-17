var adsDA = require('./adsDA');




exports.getAds = function (req, res) {
    try {
        adsDA.getAds(req, res);
    } catch (error) {
        console.log(error);
    }
}

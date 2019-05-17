var bannersDA = require('./bannerDA');


exports.getBanners = function (req, res) {
    try {
        bannersDA.getBanners(req, res);
    } catch (error) {
        console.log(error);
    }
}

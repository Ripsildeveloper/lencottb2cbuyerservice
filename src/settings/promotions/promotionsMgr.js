var promotionsDA = require('./promotionsDA');

exports.getPromotions = function (req, res) {
    try {
        promotionsDA.getPromotions(req, res);
    } catch (error) {
        console.log(error);
    }
}

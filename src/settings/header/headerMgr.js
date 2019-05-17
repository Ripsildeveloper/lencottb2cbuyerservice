
var headerDA = require('./headerDA');



exports.getHeaderDetails = function (req, res) {
    try {
        headerDA.getHeaderDetails(req, res);
    } catch (error) {
        console.log(error);
    }
}

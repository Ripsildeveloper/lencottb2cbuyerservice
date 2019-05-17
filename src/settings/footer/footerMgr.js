var footerDA = require('./footerDA');

exports.getFooterDetails = function (req, res) {
    try {
        footerDA.getFooterDetails(req, res);

    } catch (error) {
        console.log(error);
    }
}






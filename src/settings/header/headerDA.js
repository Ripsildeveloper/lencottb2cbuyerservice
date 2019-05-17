var Header  = require('../../model/header.model');
var appSetting = require('../../config/appSetting');

exports.getHeaderDetails = function (req, res) {
    Header.find({}).select().exec(function (err, header) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving notes."
            });
        } else {
          if(header.length !== 0){
                header[0].logoImageName =  appSetting.headerServerPath + header[0].logoImageName;
            }
            res.status(200).json(header);
        }
    });
}
var Footer = require('../../model/footer.model');
var appSetting = require('../../config/appSetting');



exports.getFooterDetails = function (req, res) {
    Footer.find({}).select().exec(function (err, footerData) {
        if (err) {
            res.status(500).send({
                "result": 'error occured while retreiving data'
            })
        } else {
            if(footerData.length !== 0) {
                footerData[0].logoImageName = appSetting.logoServerPath + footerData[0].logoImageName;
                res.status(200).json(footerData);
            }
         
        }
    })
}


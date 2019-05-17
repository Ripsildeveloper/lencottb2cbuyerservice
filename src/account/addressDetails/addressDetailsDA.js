'use strict';

var addressModel = require('./../../model/address.model');

exports.addressform = function (req, res, ) {
    var addressform = new addressModel();
    addressform.name = req.body.name;
    addressform.state = req.body.state;
    addressform.mobilenumber = req.body.mobilenumber;
    addressform.address = req.body.address;
    addressform.save(
        function (err, addressData) {
            if (err) {
                res.status(500).send({
                    "result": "0"
                });
            } else {
                res.status(200).json(addressData);
            }
        });
};
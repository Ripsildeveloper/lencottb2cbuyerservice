'use strict';

var CardDetails = require('./../../model/cardDetails.model');

exports.cardForm = function (req, res, ) {
    var cardForm = new CardDetails();
    cardForm.cardName = req.body.cardName;
    cardForm.cardNumber = req.body.cardNumber;
    cardForm.expiryMonth = req.body.expiryMonth;
    cardForm.expiryYear = req.body.expiryYear;
    cardForm.save(
        function (err, cardData) {
            if (err) {
                res.status(500).send({
                    "result": "0"
                });
            } else {
                res.status(200).json(cardData);
            }
        });
};
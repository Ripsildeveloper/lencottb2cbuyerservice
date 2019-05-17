'use strict';
var AdminAccount = require('../../model/accounts.model');

exports.signInToSite = function (req, res) {
  AdminAccount.findOne({
    'mobileNumber': req.body.mobileNumber,
    'password': req.body.password
  }, function (err, userDetail) {
    if (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving notes."
      });
    } else {
      res.status(200).json(userDetail);
    }
  });
};


exports.createContent = function (req, res) {
    var adminAccount = new AdminAccount(req.body);

    adminAccount.save(function (err, contentData) {
        if (err) {
            res.send(err);
            console.log(err);
        } else {
            res.send(contentData);
        }
    });
  /*   res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header("Access-Control-Allow-Credentials", "true");
  if (!req.session.cart) {
    res.status(500).send();
  } else {
    console.log(req.session.cart)
    res.status(200).send(req.session.cart);
  } */
};

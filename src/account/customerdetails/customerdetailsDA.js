'use strict';
var MasterCustomerDetails = require('./../../model/customerdetails.model');
var accounts = require('../../model/accounts.model');

exports.regform = function (req, res, customerId) {
  MasterCustomerDetails.find({ 'mobileNumber': req.body.mobileNumber }).select().exec(function (err, mobileNumberExist) {
    if (err) {
      res.status(500).send({
        "result": "0"
      });
    } else {
      if (mobileNumberExist.length !== 0) {
        res.status(200).send({
          "result": "Already Exist"
        });
      } else {
        var regform = new MasterCustomerDetails();
        regform.customerId = customerId;
        regform.mobileNumber = req.body.mobileNumber;
        regform.password = req.body.password;
        regform.emailId = req.body.emailId;
        regform.save(
          function (err, registrationData) {
            if (err) {
              res.status(500).send({
                "result": "0"
              });
            } else {
              var login = new accounts();
              login.customerId = customerId;
              login.mobileNumber = req.body.mobileNumber;
              login.password = req.body.password;
              login.emailId = req.body.emailId;
              login.save(
                function (err, loginData) {
                  if (err) {
                    res.status(500).send({
                      "result": "0"
                    });
                  } else {
                    res.status(200).json(loginData);
                  }
                });
            }
          });
      }
    }
  });
};


exports.updateAddressDetails = function (req, res) {

  let addressData = {
    name: req.body.name,
    mobileNumber: req.body.mobileNumber,
    state: req.body.state,
    city: req.body.city,
    streetAddress: req.body.streetAddress,
    building: req.body.building,
    landmark: req.body.landmark,
    pincode: req.body.pincode
  };
  MasterCustomerDetails.findOneAndUpdate({
    customerId: req.params.id
  }, {
      $push: {
        addressDetails: addressData
      }
    },
    function (err, details) {
      if (err) { // if it contains error return 0
        res.status(500).send({
          "result": 0
        });
      } else {

        //res.status(200).json(mainCatValue.mainCategory[mainCatValue.mainCategory.length -1]);
        MasterCustomerDetails.find({
          'customerId': req.params.id
        }, function (err, data) {
          if (err) {
            res.status(500).send({
              "result": 0
            });
          } else {

            res.status(200).json(data);
          }
        });
      }
    }
  )
}

exports.updatecardDetails = function (req, res) {
  let cardDetails = {
    cardName: req.body.cardName,
    cardNumber: req.body.cardNumber,
    expiryMonth: req.body.expiryMonth,
    expiryYear: req.body.expiryYear,
  };
  MasterCustomerDetails.findOneAndUpdate({
    customerId: req.params.id
  }, {
      $push: {
        cardDetails: cardDetails
      }
    },
    function (err, cardDetails) {
      if (err) { // if it contains error return 0
        res.status(500).send({
          "result": 0
        });
      } else {

        //res.status(200).json(mainCatValue.mainCategory[mainCatValue.mainCategory.length -1]);
        MasterCustomerDetails.find({
          'customerId': req.params.id
        }, function (err, data) {
          if (err) {
            res.status(500).send({
              "result": 0
            });
          } else {

            res.status(200).json(data);
          }
        });
      }
    }
  )
}


exports.updateprofilesDetails = function (req, res) {
  MasterCustomerDetails.findOne({
    'customerId': req.params.id
  }, function (err, profilesDetails) {
    if (err) { // if it contains error return 0
      res.status(500).send({
        "result": 0
      });
    } else {
        profilesDetails.emailId = req.body.emailId,
        profilesDetails.mobileNumber = req.body.mobileNumber,
        profilesDetails.password = req.body.password,
        profilesDetails.firstName = req.body.firstName,
        profilesDetails.lastName = req.body.lastName,
        profilesDetails.dateOfBirth = req.body.dateOfBirth,
        profilesDetails.location = req.body.location,
        profilesDetails.gender = req.body.gender,
        profilesDetails.save(function (err) {
          if (err) {
            res.status(201).send({
              "result": 0
            });
          } else {
            MasterCustomerDetails.findOne({
              'customerId': req.params.id
            }, function (err, data) {
              if (err) {
                res.status(500).send({
                  "result": 0
                });
              } else {

                res.status(200).json(data);
              }
            });
          }
        });
    }
  });
}

exports.getCustomerDetails = function (req, res) {
  MasterCustomerDetails.findOne({
    'customerId': req.params.id
  }, function (err, data) {
    if (err) {
      res.status(500).send({
        "result": 0
      });
    } else {

      res.status(200).json(data);
    }
  });
}

exports.customerAddressDelete = function (req, res) {
  MasterCustomerDetails.findOne({ 'customerId': req.params.id }, function (err, accountDetails) {
    if (err) {
      res.status(500).send({
        "result": 0
      });
    } else {
      accountDetails.addressDetails.id(req.params.addressId).remove();
      accountDetails.save(function (err) {
        if (err) {
          res.status(201).send({
            "result": 0
          });
        } else {
          MasterCustomerDetails.findOne({ 'customerId': req.params.id }).select().exec(function (err, customerDetails) {
            if (err) {
              res.status(500).json({
                "result": 0
              })
            } else {
              res.status(200).json(customerDetails)
            }
          })
        }
      });

    }
  });
}
exports.customerAddressUpdate = function (req, res) {
  MasterCustomerDetails.findOne({ 'customerId': req.params.id }, function (err, account) {
    if (err) {
      res.status(500).send({
        "result": 0
      });
    } else {
      var accountDetail = account.addressDetails.id(req.params.addressId);
      accountDetail.name = req.body.name;
      accountDetail.mobileNumber = req.body.mobileNumber;
      accountDetail.state = req.body.state;
      accountDetail.city = req.body.city;
      accountDetail.streetAddress = req.body.streetAddress;
      accountDetail.building = req.body.building;
      accountDetail.landmark = req.body.landmark;
      accountDetail.pincode = req.body.pincode;
      account.save(function (err) {
        if (err) {
          res.status(201).send({
            "result": 0
          });
        } else {
          MasterCustomerDetails.findOne({ 'customerId': req.params.id }, function (err, accountDetailUpdate) {
            if (err) {
              res.status(500).json({
                "result": 0
              })
            } else {
              res.status(200).json(accountDetailUpdate);
            }
          })
        }
      });
    }
  });
}


exports.customerCardDelete = function (req, res) {
  MasterCustomerDetails.findOne({ 'customerId': req.params.id }, function (err, accountDetails) {
    if (err) {
      res.status(500).send({
        "result": 0
      });
    } else {
      accountDetails.cardDetails.id(req.params.cardId).remove();
      accountDetails.save(function (err) {
        if (err) {
          res.status(201).send({
            "result": 0
          });
        } else {
          MasterCustomerDetails.findOne({ 'customerId': req.params.id }).select().exec(function (err, customerDetails) {
            if (err) {
              res.status(500).json({
                "result": 0
              })
            } else {
              res.status(200).json(customerDetails)
            }
          })
        }
      });
    }
  });
}

var regformDA = require('./customerdetailsDA');
var MasterCustomerDetails = require('./../../model/customerdetails.model'); //Upper  Camel case
var zeroFill = require('zero-fill');
exports.registrationform = function (req,res){
  
    try {
        MasterCustomerDetails.find().select().exec(function (err, details) {
          if(err) {
            res.status(500).send({
              message: "Some error occurred while retrieving notes."
            });
          } else{
             if (details[0] == null) {
              var customerId= 'CUS' + "00000001";
              regformDA.regform(req, res, customerId);
            } else {
              var arrayLength = details.length - 1;
            var maxID =details[arrayLength].customerId.substr(3,8);
              var incOrder = maxID.slice(-8);
              var addZero = zeroFill(8, 1);
              var result = parseInt(incOrder) + parseInt(addZero);
              var results = zeroFill(8, result);
              var customerId = 'CUS' + results;
              regformDA.regform(req, res, customerId);
            }
          }
          
          
        })
      } catch (error) {
        console.log(error);
      }
};



exports.updateAddressDetails = function (req, res) {
  try {
    regformDA.updateAddressDetails(req, res);
  } catch (error) {
      console.log(error)
  }
}


exports.updatecardDetails = function (req, res) {
  try {
    regformDA.updatecardDetails(req, res);
  } catch (error) {
      console.log(error)
  }
}

exports.updateprofilesDetails = function (req, res) {
  try {
    regformDA.updateprofilesDetails(req, res);
  } catch (error) {
      console.log(error)
  }
}
exports.getCustomerDetails = function (req, res) {
  try {
    regformDA.getCustomerDetails(req, res);
  } catch (error) {
      console.log(error)
  }
}

exports.customerAddressDelete = function (req, res) {
  try {
    regformDA.customerAddressDelete(req, res);
  } catch (error) {
      console.log(error)
  }
}


exports.customerAddressUpdate = function (req, res) {
  try {
    regformDA.customerAddressUpdate(req, res);
  } catch (error) {
      console.log(error)
  }
}
exports.customerCardDelete = function (req, res) {
  try {
    regformDA.customerCardDelete(req, res);
  } catch (error) {
      console.log(error)
  }
}

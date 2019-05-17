var mongoose = require('mongoose');
var cardDetails = require('./cardDetails.model');
var profileDetails = require('./profileDetails.model');
var address = require('./address.model');
const CustomerDetailsSchema = new mongoose.Schema({
    customerId: String,
    emailId: String,
    mobileNumber: Number,
    password: String,
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    location: String,
    gender: String,
    addressDetails: [address],
    cardDetails: [cardDetails],
    /* profileDetails: [profileDetails] */

});
const Customerdetails = mongoose.model('Customerdetails', CustomerDetailsSchema);
module.exports = Customerdetails;


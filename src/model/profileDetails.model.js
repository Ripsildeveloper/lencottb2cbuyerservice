var mongoose = require('mongoose');

const profilesSchema = new mongoose.Schema({
    emailId: String,
    mobileNumber:Number,
    password:String,
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    location: String,
    gender: String
  });

module.exports = profilesSchema;

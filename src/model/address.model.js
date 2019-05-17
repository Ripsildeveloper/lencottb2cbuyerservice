var mongoose = require('mongoose');
const addressFormSchema = new mongoose.Schema({
  name: String,
  mobileNumber: Number,
  streetAddress: String,
  building: String,
  landmark: String,
  city: String,
  state: String,
  pincode: String
});

module.exports = addressFormSchema;

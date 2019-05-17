var mongoose = require('mongoose');

const regFormSchema = new mongoose.Schema({
  customerId:String,
  emailId: String,
  mobileNumber:Number,
  password: String,
  token: String
  });
const accounts= mongoose.model('accounts', regFormSchema);
module.exports = accounts;
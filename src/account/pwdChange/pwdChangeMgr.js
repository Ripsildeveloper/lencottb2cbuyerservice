'use strict';
var pwdChangeDA = require('../../account/pwdChange/pwdChangeDA');
var AdminAccount = require('../../model/account.model');
var nodemailer = require('nodemailer');
var randomKey = require('random-key-generator');    


exports.pwdChangeResetPwd = function (req, res) {
  pwdChangeDA.pwdChangeResetPwd(req, res);
}

exports.pwdChangeRequest = function (req, res) {
  
  var currentDate = new Date();
  var numberOfDaysToAdd = 2;
  currentDate.setDate(currentDate.getDate() + numberOfDaysToAdd);
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();
  var date = day + "/" + month + "/" + year

  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  var someFormattedDate =year  + "-" + month + "-" + day + " " + hours + ":" + minutes;
  var rdmKey = randomKey(10);
  var emailId = req.params.emailId;
  pwdChangeDA.pwdChangeRequest(req, res, someFormattedDate, rdmKey);
  try {
    sendEmail(rdmKey, emailId);
  }
  catch(error){
    console.log(error);
  }

};


var sendEmail = function (randomKey, emailId) {
    let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: 'RIntegerNotification@gmail.com',
      pass: 'SellerApp@1'
    }
  });

  var mailOptions = {
    from: 'RIntegerNotification@gmail.com',
    to: emailId,
    subject: 'Password Change Notification',
    text: 'Please use the link to reset your password http://http://ec2-13-126-16-163.ap-south-1.compute.amazonaws.com:81/PwdChangeReset/' + randomKey
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

exports.pwdChangeReset = function (req, res) {
  pwdChangeDA.pwdChangeReset(req, res)
};

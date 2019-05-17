
    
var jwt = require('jsonwebtoken');

var accounts = require('./../../model/regForm.model');
exports.validateToken = function (req, res, next) {
  console.log('LOGGED');
  var allowAnonymousRoute = false;
  var secretKey = '123456789?*!^sghd';
  var token =  req.headers['authorization'] 
  /* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNTUxMTYwNzkzLCJleHAiOjE1NTEyMDM5OTN9.sDiOpMgMTexvLeDiyxZGsZXgIJVdYrqg8VfCdS0kpl0 */
  var allowAnonymousRoutes = ['/registration', '/admin', '/login/validate', 'some other route'];
  
  for (var i = 0; i < allowAnonymousRoutes.length; i++) {
    console.log(allowAnonymousRoutes[i] === req.path);
    if (allowAnonymousRoutes[i] === req.path){
      allowAnonymousRoute=true;
      break;
    }
  }
  if (allowAnonymousRoute) {
    console.log('anonymous route');
    next();
  } else {
    if (token)   {
      jwt.verify(token, secretKey, function (err, emailId) {
        console.log(emailId);
        if (err)
          return res.status(401).send({
            auth: false,
            message: 'Failed to authenticate token.'
          });
        else {
  
          //Check userName is available in MongoDB, if it is there next() , or return res.status(401).send({       auth: false,        message: 'Token is invalid'    });
  
          accounts.findOne({
          /*   'mobileNumber': mobileNumber.id */
          'emailId' : emailId.id
          }, function (err, userDetail) {
            if (err) {
              res.status(500).send({
                message: "Some error occurred while retrieving notes."
              });
            } else {
              if (!userDetail) {
                return res.status(401).send({
                  auth: false,
                  message: 'not find'
                });
              }else{
                next();
              }
            }
          });
        }
      }); 
    }
    else{
      return res.status(401).send({
        auth: false,
        message: 'Failed to authenticate token.'
      });
    }
     
  }
};

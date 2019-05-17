'use strict';
var signInMgr = require('./signIn/signInMgr');

/* var pwdChangeMgr = require('./pwdChange/pwdChangeMgr'); */
var addressDetailsMgr = require('./addressDetails/addressDetailsMgr');
var cardDetailsMgr = require('./cardDetails/cardDetailsMgr');
var customerDetailsMgr = require('./customerdetails/customerdetailsMgr');

module.exports = function (app) {
    app.route('/admin')
        .post(signInMgr.create);

    app.route('/admin/validate')
        .post(signInMgr.signInToSite);
/* 
    app.route('/pwdChange/:emailId')
        .get(pwdChangeMgr.pwdChangeRequest);


    app.route('/pwdChange/reset')
        .post(pwdChangeMgr.pwdChangeReset); */

    app.route('/address')
        .post(addressDetailsMgr.addressform);

    app.route('/card')
        .post(cardDetailsMgr.cardForm);

    app.route('/registration').
    post(customerDetailsMgr.registrationform); // regsitration form
    app.route('/addressupdate/:id').
    put(customerDetailsMgr.updateAddressDetails);
    app.route('/cardupdate/:id').
    put(customerDetailsMgr.updatecardDetails);
    app.route('/profileupdate/:id').
    put(customerDetailsMgr.updateprofilesDetails);

    app.route('/customerdetail/:id')
    .get(customerDetailsMgr.getCustomerDetails);  
    app.route('/address/:id/delete/:addressId')
    .delete(customerDetailsMgr.customerAddressDelete);
    app.route('/address/:id/update/:addressId')
    .put(customerDetailsMgr.customerAddressUpdate); 
    app.route('/card/:id/delete/:cardId')
    .delete(customerDetailsMgr.customerCardDelete); 
    


}
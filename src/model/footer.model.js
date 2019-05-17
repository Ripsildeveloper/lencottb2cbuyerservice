var mongoose = require('mongoose');

const FooterSchema = new mongoose.Schema({
    address: String,
    instagramLink: String,
    facebookLink: String,
    pintrestLink: String,
    googlePlusLink: String,
    twitterLink: String,
    map: String,
    contactNo: Number,
    alternativeContactNo: Number,
logoImageName: String,
mailId: String,


});

const Footer = mongoose.model('footer', FooterSchema);
module.exports = Footer;
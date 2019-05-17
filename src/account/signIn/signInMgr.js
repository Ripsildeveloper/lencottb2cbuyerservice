'use strict';
var signInDA = require('./signInDA');
exports.signInToSite = function (req, res) {
    signInDA.signInToSite(req, res);
};

exports.create = function (req, res) {
    signInDA.createContent(req, res);
};

var viewProductDA = require('./viewProductDA');

exports.viewProducts = function (req, res) {
    try {
        viewProductDA.viewProducts(req, res);
    } catch (error) {
        console.log(error);
    }
}

exports.viewSingleProducts = function (req, res) {
    try {
        viewProductDA.viewSingleProducts(req, res);
    } catch (error) {
        console.log(error);
    }
}

exports.categoryProduct = function (req, res) {
    try {
        viewProductDA.categoryProduct(req, res);
    } catch (error) {
        console.log(error);
    }
}
exports.singleProduct = function (req, res) {
    try {
        viewProductDA.singleProduct(req, res);
    } catch (error) {
        console.log(error);
    }
}
exports.relatedProducts = function (req, res) {
    try {
        viewProductDA.relatedProducts(req, res);
    } catch (error) {
        console.log(error);
    }
}

exports.lowToHigh = function (req, res) {
    try {
        viewProductDA.lowToHigh(req, res);
    } catch (error) {
        console.log(error);
    }
}
exports.highToLow = function (req, res) {
    try {
        viewProductDA.highToLow(req, res);
    } catch (error) {
        console.log(error);
    }
}

exports.filterByPrice = function (req, res) {
    try {
        viewProductDA.filterByPrice(req, res);
    } catch (error) {
        console.log(error);
    }
}

exports.filterByColor = function (req, res) {
    try {
        viewProductDA.filterByColor(req, res);
    } catch (error) {
        console.log(error);
    }
}
exports.getProductSettings = function (req, res) {
    try {
        viewProductDA.getProductSettings(req, res);
    } catch (error) {
        console.log(error);
    }
}
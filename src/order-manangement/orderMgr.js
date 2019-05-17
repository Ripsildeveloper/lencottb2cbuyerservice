var orderDA = require('./orderDA');
var Order = require('./../model/order.model');
var zeroFill = require('zero-fill');


exports.newOrderAdd = function (req, res) {
    try {
        var currentDate = new Date();
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();
        var date = day + "/" + month + "/" + year;


        var oYear = year.toString();
        var orderYear = oYear.slice(-2);
        var order = "ORD";
        var locale = "en-us";
        var result = currentDate.toLocaleString(locale, {
            month: "long"
        });
        var orderMonth = result.substr(0, 3).toUpperCase();

        Order.find().select().exec(function (err, details) {
            if (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving notes."
                });
            } else {
                if (details[0] == null) {
                    var orderID = order + orderYear + orderMonth + "0001";
                    orderDA.newOrderAdd(req, res, orderID);
                } else {
                    var arrayLength = details.length - 1;
                    var maxID = details[arrayLength].orderId.substr(10, 3);
                    var incOrder = maxID.slice(-4);
                    var addZero = zeroFill(4, 1);
                    var result = parseInt(incOrder) + parseInt(addZero);
                    var results = zeroFill(4, result);
                    var orderID = order + orderYear + orderMonth + results;
                    orderDA.newOrderAdd(req, res, orderID);
                }
            }

        })

    } catch (error) {
        console.log(error);
    }
}
exports.uniqueOrderView = function (req, res) {
    try {
        orderDA.uniqueOrderView(req, res);
    }
    catch (error) {
        console.log(error);
    }
}
exports.updateProducts = function (req, res) {
    try {
        orderDA.updateProducts(req, res);
    }
    catch (error) {
        console.log(error);
    }
}

exports.updateQtyProducts = function (req, res) {
    try {
        orderDA.updateQtyProducts(req, res);
    }
    catch (error) {
        console.log(error);
    }
}
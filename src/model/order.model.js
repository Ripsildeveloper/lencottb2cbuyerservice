var mongoose = require('mongoose');
var Size = require('./size.model');
const OrderSchema = new mongoose.Schema({
    customerId: String,
    orderId: String,
    items: [{productId: mongoose.Schema.Types.ObjectId, pack: Number, moq: Number,
        ratioQty: Number, size: [Size]}],
    total: Number,
    addressDetails: [{
        name: String,
        mobileNumber: Number,
        streetAddress: String,
        building: String,
        landmark: String,
        city: String,
        state: String,
        pincode: String
    }],
    paymentStatus: String,
    orderStatus: String,
    orderDate: Date
});
const Order = mongoose.model('orders', OrderSchema);
module.exports = Order;
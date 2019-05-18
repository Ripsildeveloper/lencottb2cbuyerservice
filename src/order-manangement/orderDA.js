var Order = require('./../model/order.model')
var Product = require('./../model/product.model')

exports.newOrderAdd = function (req, res, orderId) {
  var order = new Order();
  order.customerId = req.body.customerId;
  order.orderId = orderId;
  order.items = req.body.items;
  order.addressDetails = req.body.addressDetails;
  order.paymentStatus = 'Success';
  order.orderStatus = 'New';
  order.orderDate = new Date();
  order.total = req.body.total;
  order.save(function (err, data) {
    if (err) {
      res.status(500).json(err)
    } else {
      res.status(200).json(data);
    }
  });
}

/* 
exports.newOrderAdd = function (req, res, orderId) {
  var reqOrder = req.body.items;
  var test = reqOrder.map(item => item.productId);
  Product.find({ _id:{ $in: test }}).select().exec(function (err, products) {
    if (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving products."
      });
    } else {
      reqOrder.map(item => {
        const productSingle = products.find(test =>  test.id === item.productId);
        productSize = productSingle.size;
        productSize.forEach( elem => {
          elem.sizeQty -= elem.ratio * productSingle.moq * item.pack;
        });
    });
    res.status(200).json(products);
}
});
} */

exports.uniqueOrderView = function (req, res) {
  Order.find({
    'customerId': req.params.id
  }).sort({
    orderId: -1
  }).exec(function (err, details) {
    if (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving notes."
      });
    } else {
      Order.aggregate([
        { 
          $match: { customerId: req.params.id }
       },
        /* { $unwind: "$items" }, */
        {
          $lookup:
          {
            from: "products",
            localField: "items.productId",
            foreignField: "_id",
            as: "cart_product"
          }
        }
      ], function (err, orderData) {
        if (err) {
          res.status(500).send({
            message: "no cart product"
          });
        } else {
          res.status(200).json(orderData);
        }
      });
    }
  });
}


exports.updateProducts = function (req, res) {
  Product.find({}).select().exec(function (err, product) {
    if (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving products."
      });
    } else {
      res.status(200).json(product);
    }
  });
}
exports.updateQtyProducts = function (req, res) {
  Order.findOne({ orderId: req.params.orderId }).select().exec(function (err, order) {
    if (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving orders."
      });
    } else {
      var updatedData = [];
      for (var i = 0; i < order.items.length; i++) {
        var itemProduct = order.items[i];
          Product.update({
            _id: itemProduct.productId, "size.skuCode": itemProduct.skuCode
          }, { $inc: { "size.$.sizeQty": -itemProduct.qty } }, function (err, update) {
            if (err) {
              res.status(500).send({
                message: "Some error occurred while retrieving products."
              });
            } else {
              updatedData.push(update)
            }
          });
      }
      res.status(200).json(updatedData);
    }
  });
}

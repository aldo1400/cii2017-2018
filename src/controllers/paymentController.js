var Type = require('../collections/type');
var User = require('../collections/user');
var Payment = require('../collections/payment');
var mongoose = require('mongoose');

module.exports.create= function (req,res) {
    var data = req.body;
    console.log(data);

    var payment = new Payment();
    payment.user_id = mongoose.Types.ObjectId(data.user);
    payment.type = data.type;
    payment.quantity = data.quantity;
    payment.save(function (err,payment) {
      if(err){
        console.log(err);
        return res.sendStatus(503);
      }
      if (payment) {
        User.findOne({_id:data.user})
        .exec(function (err,user) {
          if(err) return res.sendStatus(503);
          if (user) {
            user.debt -= payment.quantity;
            user.save(function (err,user) {
                if(err){
                  console.log(err);
                  return res.sendStatus(503)
                }
                console.log(user);
                return res.json(user);
            });
          }
        });
      }
    });
}

module.exports.getPayment = function (req,res) {
    Payment.find({}).populate('user_id')
    .exec(function (err,payment) {
      if(err) return res.sendStatus(503);
      return res.json(payment);
    });
}

module.exports.getTotalPayment = function (req,res) {
    Payment.find({})
    .exec(function (err,payment) {
      if(err) return res.sendStatus(503);
      if (payment) {
        var total=0;
        payment.map(function (value) {
          total+= value.quantity;
        })
      }
      return res.json(total);
    });
}


module.exports.getPaymentUser = function (req,res) {
    var data = req.query;
    User.findOne({_id:data.user})
    .exec(function (err,user) {
      if(err) return res.sendStatus(503);
      if (user) {
          console.log(user);
          Payment.find({user_id:user._id})
          .exec(function (err,payment) {
            if(err) return res.sendStatus(503);
            return res.json(payment);
          });
      }
    });
}

module.exports.deletePaymentOne = function (req,res) {
    var data = req.query;
    console.log(data);
    Payment.findOne({_id:data.id})
    .exec(function (err,payment) {
      if(err) return res.sendStatus(503);
      console.log(payment);
      User.findOne({_id:payment.user_id})
      .exec(function (err,user) {
        if(err) return res.sendStatus(503);
        console.log(user);
        user.debt=user.debt+payment.quantity;
        payment.remove(function (err,payment) {
          if(err) return res.sendStatus(503);
          console.log(payment);
          user.save(function (err,user) {
            if(err) return res.sendStatus(503);
            console.log(user);
            return res.json(user);
          })
        })
      })
    })
}

module.exports.deletePayment = function (req,res) {
    Payment.remove({})
    .exec(function (err,payment) {
      if(err) return res.sendStatus(503);
      return res.json(payment);
    });
}

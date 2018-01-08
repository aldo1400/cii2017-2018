"use strict";
const formidable = require("formidable");
const fs = require("fs-extra");
const path = require("path");
const randomstring = require("randomstring");
var mongoose = require('mongoose');
//var bcrypt = require('bcrypt');
// var session = require('express-session');

var User = require('../collections/user');
var Type = require('../collections/type');
var Workshop = require('../collections/workshop');
var Payment = require('../collections/payment');
var jwt = require('jsonwebtoken');
var uploaderController = require('./uploader');
var mail = require('./mail');
var multer = require ('multer');

//****JULIO*****//
module.exports.login=function(req,res){
  res.render('asistencia/login')
}
// module.exports.dashboard=function(req,res){
//   if (req.session.user) {
//     res.render('asistencia/index')
//   }
//   else {
//     return res.redirect('/');
//   }
// }

//****JULIO*****/
module.exports.register = function (req,res) {
    //console.log('registrando',req.files);
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      let data = fields;

      Type.findOne({_id:data.type})
      .exec(function (err,type) {
        if(type){
          var user = new User();

          data.photo = path.join("uploads/", files.photo.name);
          console.log(data);

          var promotion = new Date(2017,10,5);
          var today = new Date();
          var total = type.amount;
          console.log(promotion);
          console.log(today);
          if (today < promotion) {
            console.log('antes');
            if (type.name == "Estudiante") {
              total = total - 0.1*total;
            }
            if (type.name == "Profesional y público en general") {
              total = 120;
            }
          }

          user.dni = data.dni;
          user.name = data.name;
          user.lastname = data.lastname;
          user.institution = data.institution;
          user.type = mongoose.Types.ObjectId(data.type);
          user.discount = data.discount? data.discount : 0;
          user.debt = total - user.discount;
          user.city = data.city;
          user.email = data.email;
          user.cellphone = data.cellphone;
          user.eventType = data.eventType;
          user.photo = data.photo;
          var today = new Date();
          user.createdAt = today.setHours(today.getHours()-5);

          user.save(function (err,user) {
              if(err){
                console.log(err);
                return res.sendStatus(503)
              }
              user.title = "XVIII Congreso Internacional de Informatica y Sistemas-TACNA";
              user.date = "13 al 17 de Noviembre";
              mail.sendEmail(user);
              console.log(user);
              return res.json(200);
          });
        }
      });


      // Photo.create(data)
      //   .then((err,result) => {
      //     if(err) return res.status(500).send(err);
      //     data.type = "";
      //     console.log(result);
      //     return res.send();
      //   });
    });
    form.on("error", function(err) {
      return res.send(null, 500);
    });

    form.on("fileBegin", function(name, file) {
      let rdName = randomstring.generate();
      rdName = rdName.replace("/", "");
      let originalName = file.name;
      file.name = rdName + path.extname(originalName);
    });

    form.on("end", function(fields, files) {
      const temp_path = this.openedFiles[0].path;
      const file_name = this.openedFiles[0].name;
      const new_location = path.join(__dirname, "../public/uploads/", file_name);

      fs.copy(temp_path, new_location, function(err) {
        if (err) {
          console.error(err);
        } else {
          console.log("success!")
        }
      });
    });
}


module.exports.create = function (req,res) {

      var data = req.body;

      Type.findOne({_id:data.type})
      .exec(function (err,type) {
        if(type){
          var user = new User();
          console.log(data);
          var list = {
            "ESIS-E" : 50,
            "ESIS-P" : 100,
            "PUNO" : 80,
            "PUNO-P" : 120,
            "AYACUCHO" : 70,
            "AYACUCHO-P" : 120,
            "UAP" : 70,
            "UAP-P" : 120,
            "UPT" : 80,
            "UPT-P" : 120,
            "UNAM" : 80,
            "UNAM-P" : 120,
            "ILO" : 80,
            "ILO-P" : 120
          };

          var promotion = new Date(2017,10,5);
          var today = new Date();
          var total = type.amount;
          console.log(promotion);
          console.log(today);
          if (today < promotion) {
            console.log('antes');
            if (type.name == "Estudiante") {
              total = total - 0.1*total;
            }
            if (type.name == "Profesional y público en general") {
              total = 120;
            }
          }

          user.dni = data.dni;
          user.name = data.name;
          user.lastname = data.lastname;
          user.institution = data.institution;
          user.type = mongoose.Types.ObjectId(data.type);
          user.discount = data.discount? data.discount : 0;
          if (data.delegation) {
            user.delegation = data.delegation;
            total = list[data.delegation];
          }
          user.debt = total - user.discount;
          user.description = data.description;
          user.city = data.city;
          user.email = data.email;
          user.cellphone = data.cellphone;
          user.eventType = 'CIIS';
          var today = new Date();
          user.createdAt = today.setHours(today.getHours()-5);

          user.save(function (err,user) {
              if(err){
                console.log(err);
                return res.sendStatus(503)
              }
              user.title = "XVIII Congreso Internacional de Informatica y Sistemas-TACNA";
              user.date = "13 al 17 de Noviembre";
              //mail.sendEmail(user);
              console.log(user);
              return res.json(200);
          });
        }
      });
}


module.exports.update = function (req,res) {

      var data = req.body;

      Type.findOne({_id:data.type})
      .exec(function (err,type) {
        if(type){
          User.findOne({_id:data.user}).exec(function (err,user) {
                  if (user) {
                    console.log(user);
                    console.log(data);
                    var list = {
                      "ESIS-E" : 50,
                      "ESIS-P" : 100,
                      "PUNO" : 80,
                      "PUNO-P" : 120,
                      "AYACUCHO" : 70,
                      "AYACUCHO-P" : 120,
                      "UAP" : 70,
                      "UAP-P" : 120,
                      "UPT" : 80,
                      "UPT-P" : 120,
                      "UNAM" : 80,
                      "UNAM-P" : 120,
                      "ILO" : 80,
                      "ILO-P" : 120
                    };
                    var promotion = new Date(2017,10,5);
                    var today = new Date();
                    var total = type.amount;
                    console.log(promotion);
                    console.log(today);
                    if (today < promotion) {
                      console.log('antes');
                      if (type.name == "Estudiante") {
                        total = total - 0.1*total;
                      }
                      if (type.name == "Profesional y público en general") {
                        total = 120;
                      }
                    }

                    user.dni = data.dni;
                    user.name = data.name;
                    user.lastname = data.lastname;
                    user.institution = data.institution;
                    user.type = mongoose.Types.ObjectId(data.type);
                    user.discount = data.discount? data.discount : 0;
                    if (data.delegation) {
                      user.delegation = data.delegation;
                      total = list[data.delegation];
                    }
                    user.debt = total - user.discount;
                    user.description = data.description;
                    user.city = data.city;
                    user.email = data.email;
                    user.cellphone = data.cellphone;
                    user.eventType = 'CIIS';

                    user.save(function (err,user) {
                        if(err){
                          console.log(err);
                          return res.sendStatus(503)
                        }
                        discountPayment(user,res);
                        // return res.json(200);
                    });
                  }
              })
        }
      });
}

function discountPayment(user,res) {
  User.findOne({_id:user._id})
  .exec(function (err,user) {
    Payment.find({user_id:user._id}).exec(function (err,payment) {
      if(err) return res.sendStatus(503);
      if (payment) {
        payment.map(function (value) {
          user.debt=user.debt-value.quantity;
        })
        user.save(function (err,user) {
          if(err){
            console.log(err);
            return res.sendStatus(503)
          }
          console.log(user);
          return res.json(user);
        })
      }
    })
  })
}

module.exports.sslController1 = function(req,res){
console.log("hola")
console.log("archivo",req.params)
fs.readFile('src/public/.well-known/acme-challenge/zf2uIh7KIBEFFrKnxQY1jBGH5xEYlY2E6BAz0dMKx6s', 'utf-8', (err, data) => {
      if(err) {
        console.log('error: ', err);
      } else {
        console.log(data);
        res.send(data)
      }
    });

}

module.exports.sslController2 = function(req,res){
console.log("archivo",req.params)

    fs.readFile('src/public/.well-known/acme-challenge/ziWr--RAg3dYNucCUNNHMJt0nzN5KBueFLRBKI6_K84', 'utf-8', (err, data) => {
      if(err) {
        console.log('error: ', err);
      } else {
        console.log(data);
        res.send(data)
      }
    });
}
module.exports.createView = function (req,res) {
  Type.find({})
  .exec(function (err,type) {
    if(err) return res.sendStatus(503);
    res.render('index', { types: type });
  });
}
module.exports.getUsers = function (req,res) {
    User.find({})
    .exec(function (err,user) {
      if(err) return res.sendStatus(503);
      return res.json(user);
    });
}

module.exports.getUserOne = function (req,res) {
    var data = req.query;
    console.log(data);
    User.findOne({_id:data.user})
    .exec(function (err,user) {
      if(err) return res.sendStatus(503);
      return res.json(user);
    });
}


module.exports.addUserWorkshop = function (req,res) {
  var data = req.body;
  console.log(data);
  var workshop = new Workshop();
  workshop.email = data.email;
  workshop.name = data.name;
  workshop.lastname = data.lastname;
  workshop.city = data.city;
  workshop.institution = data.institution;
  workshop.type = data.type;
  workshop.cellphone = data.cellphone;
  workshop.dni = data.dni;
  workshop.list = data.list;
  console.log('this workshop');
  console.log(workshop);
  workshop.save(function (err,workshop) {
      if(err){
        console.log(err);
        return res.sendStatus(503)
      }
      console.log(workshop);
      return res.json(workshop);
  });

}

module.exports.showWorshop = function (req,res) {
    Workshop.find({})
    .exec(function (err,workshop) {
      if(workshop) return res.json(workshop);
    });
}

module.exports.emailCheck = function (req,res) {
    var data = req.query;
    User.find({email:data.email})
    .exec(function (err,user) {
      if(user) return res.json(user);
    });
}

module.exports.emailCheckEdit = function (req,res) {
    var data = req.query;
    User.findOne({email:data.email})
    .exec(function (err,user) {
      if(user) {
        if (data.user==user._id) {
          console.log('editando y verificando email');
          return res.json(0);
        }
        else {
          return res.json(user);
        }
      }
      return res.json(0);
    });
}

module.exports.dniCheckEdit = function (req,res) {
    var data = req.query;
    User.findOne({dni:data.dni})
    .exec(function (err,user) {
      if(user) {
        if (data.user==user._id) {
          console.log('editando y verificando dni');
          return res.json(0);
        }
        else {
          return res.json(user);
        }
      }
      return res.json(0);
    });
}

module.exports.dniCheck = function (req,res) {
    var data = req.query;
    User.find({dni:data.dni})
    .exec(function (err,user) {
      if(user) return res.json(user);
    });
}

module.exports.emailCheckTaller = function (req,res) {
    var data = req.query;
    Workshop.find({email:data.email})
    .exec(function (err,user) {
      if(user) return res.json(user);
    });
}

module.exports.dniCheckTaller = function (req,res) {
    var data = req.query;
    Workshop.find({dni:data.dni})
    .exec(function (err,user) {
      if(user) return res.json(user);
    });
}

// module.exports.addAdmin = function (req,res) {
//     var data = req.body;
//     User.findOne({dni:data.dni})
//     .exec(function (err,user) {
//       if(user){
//         var password = bcrypt.hashSync(data.password, 8);
//         user.password = password;
//         user.save(function (err,user) {
//             if(err){
//               console.log(err);
//               return res.sendStatus(503)
//             }
//             console.log(user);
//             return res.json(user);
//         });
//       }
//     });
// }

// module.exports.postlogin = function (req,res) {
//   var data = req.body;
//   User.findOne({ email: data.email }).then((user) => {
//     if(!user) return "No existe el usuario";
//     var checked = bcrypt.compareSync(data.password, user.password);
//     if(checked) {
//       req.session.user = user._id;
//       return res.redirect('/dashboard');
//     }
//     return "Contraseña incorrecta";
//   })
// };

//  module.exports.logout =function (req, res) {
//   req.session.destroy();
//   res.redirect('/');
// };

module.exports.checkDate = function (req,res) {

    var promotion = new Date(2017,10,5);
    var today = new Date();
    var total = 100;
    var result;

    if (today < promotion) {
      result = "antes de la promoción";
      total = total - 0.1*total;
    }
    else {
      result = "despues de la promoción";
    }
    var data = {
      "today" :today,
      "promotion" : promotion,
      "result" : result
    };

    return res.json(data);
}
module.exports.addDelegation = function (req,res) {
    var data = req.body;
      var list = {
        "ESIS-E" : 50,
        "ESIS-P" : 100,
        "PUNO" : 80,
        "AYACUCHO" : 70,
        "UAP" : 70,
        "UPT" : 80,
        "UNAM" : 80,
        "ILO" : 80
      };
      User.findOne({_id:data.user})
      .exec(function (err,user) {
        user.delegation = data.delegation;
        user.debt = list[data.delegation];
        user.save(function (err,user) {
          if(err){
            console.log(err);
            return res.sendStatus(503);
          }
          console.log(user);
          return res.json(user);
        });
      });
}

module.exports.listUser = function (req,res) {
  User.find({}).populate("type")
  .exec(function (err,user) {
    if(err) return res.sendStatus(503);
    console.log(user);
    res.render('test',{'user':user});
  });
}

module.exports.getTotalDebt= function (req,res) {
  User.find({})
  .exec(function (err,user) {
    if(err) return res.sendStatus(503);
    if (user) {
      var totaldebt=0;
      var totalpayment=0;
      user.map(function (value) {
        totaldebt+=value.debt;
      })
      Payment.find({})
      .exec(function (err,payment) {
        if(err) return res.sendStatus(503);
        if (payment) {
          payment.map(function (value) {
            totalpayment+= value.quantity;
          })
          var data = {
            "deuda":totaldebt,
            "pagos":totalpayment,
            "total":totaldebt+totalpayment
          }
        }
        return res.json(data);
      });

    }
  });
}

module.exports.listUserTaller = function (req,res) {
  Workshop.find({})
  .exec(function (err,user) {
    if(err) return res.sendStatus(503);
    console.log(user);
    res.render('workshop',{'user':user});
  });
}

module.exports.listUserTallerCount = function (req,res) {
  Workshop.find({})
  .exec(function (err,user) {
    if(err) return res.sendStatus(503);
    var workshops=[];
    var result;
    if (user) {
      user.map(function (val) {
        for (var i = 0; i < val.list.length; i++) {
          workshops.push(val.list[i]);
        }
        result = Array.from(new Set(workshops));
      });
      var listworkshops=[];
      result.map(function (val) {
          let data = {
            "name":val,
            "count":0
          }
          listworkshops.push(data);
      });
      function isInArray(value, array) {
        return array.indexOf(value) > -1;
      }
      var total = []
      user.map(function (val) {
        var list = val.list;
        for (var i = 0; i < list.length; i++) {
          if (isInArray(list[i], result)) {
            let obj = listworkshops.find(o => o.name == list[i]);
            obj.count++;
          }
        }
      })

    }
    let usertaller= listworkshops;
    //return res.json(listworkshops);
    res.render('workshop-count',{'user':usertaller});
  });
}


module.exports.countUser = function (req,res) {
    User.find({})
    .exec(function (err,user) {
      if(err) return res.sendStatus(503);
      Type.find({}).exec(function (err,type) {
        if(err) return res.sendStatus(503);
        var list = {
          "ESIS-E" : 0,
          "ESIS-P" : 0,
          "PUNO" : 0,
          "PUNO-P" : 0,
          "AYACUCHO" : 0,
          "AYACUCHO-P" : 0,
          "UAP" : 0,
          "UAP-P" : 0,
          "UPT" : 0,
          "UPT-P" : 0,
          "UNAM" : 0,
          "UNAM-P" : 0,
          "ILO" : 0,
          "ILO-P" : 0
        };
        var totalInDelegation=0;
        var types={};
        type.map(function (typeValue) {
          list[typeValue.name] = 0;
          types[typeValue._id]=typeValue.name;
        })
        user.map(function (value) {
          if (value.delegation) {
            list[value.delegation]++;
            totalInDelegation++;
          }
          list[types[value.type]]++;
        })
        list.totalUser=user.length;
        list.totalDelegation = totalInDelegation;
        return res.json(list);
      })

    });
}


module.exports.deleteUsers = function (req,res) {
    // User.remove({})
    // .exec(function (err,user) {
    //   if(err) return res.sendStatus(503);
    //   return res.json(user);
    // });
}

module.exports.deleteTaller = function (req,res) {
    Workshop.remove({})
    .exec(function (err,workshop) {
      if(err) return res.sendStatus(503);
      return res.json(workshop);
    });
}

module.exports.deleteOne = function (req,res) {
  var data = req.body;
    User.remove({dni:data.dni})
    .exec(function (err,user) {
      if(err) return res.sendStatus(503);
      return res.json(user);

    });
}

module.exports.deleteOneEmail = function (req,res) {
  var data = req.body;
    User.remove({email:data.email})
    .exec(function (err,user) {
      if(err) return res.sendStatus(503);
      return res.json(user);
    });
}

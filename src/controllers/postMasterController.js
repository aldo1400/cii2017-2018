
var UserPostMaster = require('../collections/userpostmaster');
var User = require('../collections/user');
var mail = require('./mail');

module.exports.createView = function(req,res){

    res.render('postmaster');

}

module.exports.register = function (req,res) {
    //console.log('registrando',req.files);
    var data = req.body;
    console.log(req.body);

    var user = new UserPostMaster();
    user.name = data.name;
    user.institute= data.institute;
    user.lastname= data.lastname;
    user.type = data.type;
    user.email = data.email;
    user.dni = data.dni;
    user.cellphone = data.cellphone;
    user.eventType = data.eventType;

    user.save(function (err,user) {
        if(err){
          console.log(err);
          return res.sendStatus(503)
        }
        user.title = "XIV POSTMASTER de Informatica y Sistemas-TACNA";
        user.date = "15 de Septiembre";
        mail.sendEmail(user);
        console.log(user);
        return res.json(200);
    });

}

module.exports.getUsers = function (req,res) {
    UserPostMaster.find({})
    .exec(function (err,user) {
      if(err) return res.sendStatus(503);
      return res.json(user);
    });
}

module.exports.checkReniec = function (req,res) {

    User.find({}).populate("type")
    .exec(function (err,user) {
      if(err) return res.sendStatus(503);
      res.render('test',{'user':user});
    });
}

module.exports.deleteUsers = function (req,res) {
    UserPostMaster.remove({})
    .exec(function (err,user) {
      if(err) return res.sendStatus(503);
      return res.json(user);

    });
}

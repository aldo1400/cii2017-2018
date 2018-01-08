var User = require('../collections/user');
var Assist = require('../collections/assist');
var Type = require('../collections/type');




/**JULIO**/
module.exports.index=function(req,res){
  Type.find({})
  .exec(function (err,type) {
    if(err) return res.sendStatus(503);
    res.render("asistencia/index",{'types':type})
  });
}

/**JULIO**/

module.exports.create= function (req,res) {
    var data = req.query;
    console.log(data);

    User.findOne({dni:data.dni})
    .exec(function (err,user) {
      if(user) {
        var assist = new Assist();
        assist.user_id = user._id;
        var today = new Date();
        assist.createdAt = today.setHours(today.getHours()-5);
        assist.save(function (err,assist) {
          if(err){
            console.log(err);
            return res.sendStatus(503);
          }
          console.log(assist);
          return res.json(assist);
        });
      }
    });
}

module.exports.getAssist = function (req,res) {

  var data = req.query;
  console.log(data);

  User.findOne({dni:data.dni})
  .exec(function (err,user) {
    if(user) {
      Assist.find({user_id:user._id})
      .exec(function (err,assist){
          return res.json(assist);
      });
    }
  });
}

module.exports.getAssistAll = function (req,res) {

    User.find({}).then((users)=>{
        let fnUsersAssist = [];
        users.forEach((user)=> {
            fnUsersAssist.push(
              Assist.find({user_id: user._id}).then((assist)=>{
                let data = {};
                var days = assist.map(function(value){
                  return value.createdAt.getDate();
                });
                var assist_day = days.filter(function(item, pos) {
                    return days.indexOf(item) == pos;
                });
                data.user = user;
                data.assist = assist_day;
                return data;
              })
            );
          //fnUsersAssist.push(Assist.find({user_id: user._id}));
        });

        return Promise.all(fnUsersAssist);
    })
    .then((users) => {
      return res.json(users);
    })

}
module.exports.getAssistMain = function (req,res) {

    User.find({}).then((users)=>{
        let fnUsersAssist = [];
        users.forEach((user)=> {
            fnUsersAssist.push(
              Assist.find({user_id: user._id}).then((assist)=>{
                let data = {};
                var days = assist.map(function(value){
                  return value.createdAt.getDate();
                });
                var assist_day = days.filter(function(item, pos) {
                    return days.indexOf(item) == pos;
                });
                data.user = user;
                data.assist = assist_day;
                return data;
              })
            );
          //fnUsersAssist.push(Assist.find({user_id: user._id}));
        });

        return Promise.all(fnUsersAssist);
    })
    .then((users) => {
      console.log(users);
      res.render('asistencia/usertable',{'users':users});
      // return res.json(users);
    })

}


module.exports.getDay = function (req,res) {

  var data = req.query;
  console.log(data);

  User.findOne({dni:data.dni})
  .exec(function (err,user) {
    if(user) {
      Assist.find({user_id:user._id})
      .exec(function (err,assist){
        console.log(assist);

          var days=[];
          assist.map(function(value){
            days.push(value.createdAt.getDate());
          });

          var assist_day = days.filter(function(item, pos) {
              return days.indexOf(item) == pos;
          })
          return res.json(assist_day);
      });
    }
  });
}

module.exports.getDayAll = function (req,res) {

  User.find({})
  .exec(function (err,users) {
    if(users) {
      users.assist=users.map(function(user){

        Assist.find({user_id:user._id})
        .exec(function (err,assist){
          console.log(assist);

          var days=[];
          assist.map(function(value){
            days.push(value.createdAt.getDay());
          });

          var assist_day = days.filter(function(item, pos) {
            return days.indexOf(item) == pos;
          })

        });
      })
      return res.json(assist_day);
    }
  });
}


module.exports.deleteAssist = function (req,res) {
    Assist.remove({})
    .exec(function (err,assist) {
      if(err) return res.sendStatus(503);
      return res.json(assist);
    });
}

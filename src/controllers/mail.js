var nodemailer = require('nodemailer');
var _jade = require('jade');
var fs = require('fs');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: 'esistacna@gmail.com', // my mail
        pass: '!ciistacna123#'
    }
}));

var sendMessage = function(user, content, next){
  var mailOptions = {
    from: '"'+user.eventType+'" <esistacna@gmail.com>', // sender address
    to: user.email, // list of receivers
    subject:  user.eventType+'- TACNA ✔', // Subject line
    text: '<div>Hola '+user.name+' '+user.lastname+' confirme su preregistro</div>', // plain text body
    html: content
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
       console.log(error);
        return console.log(error);

    }
    sendInscription(user);
    console.log('Message sent: ' + info.response);
  });
};

module.exports.sendEmail = function(user){
  // res.render('index', { title: 'Express' });

  // specify jade template to load
  var template = process.cwd() + '/src/views/message.jade';

  // get template from file system
  fs.readFile(template, 'utf8', function(err, file){
    if(err){
      //handle errors
      console.log('ERROR!',err);
    }
    else {
      //compile jade template into function
      var compiledTmpl = _jade.compile(file, {filename: template});
      // set context to be used in template
      var context = {user: user};
      // get html back as a string with the context applied;
      var html = compiledTmpl(context);

      sendMessage(user,html, function(err, response){
        if(err){
          console.log('ERROR!',err);
        }
        console.log("Email sent!");
      });
    }
  });
};

module.exports.sendEmail1 = function(user){
    var html = 'hola';
  var mailOptions = {
    from: '"'+user.eventType+'" <esistacna@gmail.com>', // sender address
    to: user.email, // list of receivers
    subject:  user.eventType+'- TACNA ✔', // Subject line
    text: '<div>Hola '+user.name+' '+user.lastname+' confirme su preregistro</div>', // plain text body
    html: html
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
       console.log(error);
        return console.log(error);

    }
    sendInscription(user);
    console.log('Message sent: ' + info.response);
  });

}

  sendInscription = function(user){

  var email = user.email;
  var name = user.name;
  var mailOptions = {
    from: user.eventType+': ' + email, // sender address
    to: 'esistacna@gmail.com', // list of receivers
    subject: '['+user.eventType+'] Pre-inscripción: ' + email, // Subject line
    text: user.name+' '+user.lastname+' ('+user.email+') se ha preinscrito a '+user.eventType+'.' // plaintext body
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
       console.log(error);
        return console.log(error);

    }
    console.log('Message sent: ' + info.response);
  });

}


module.exports.contact = function(req,res){

  var email = req.body.email;
  var name = req.body.name;
  var subject = req.body.subject;
  var mailOptions = {
    from: name + ' ' + email, // sender address
    to: 'esistacna@gmail.com', // list of receivers
    subject: 'Consultas: ' + email, // Subject line
    text: subject // plaintext body
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
       console.log(error);
        return res.sendStatus(503);

    }
    console.log('Message sent: ' + info.response);
    res.send();
  });

}

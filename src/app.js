'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');

var compression = require('compression');

var app = express();

app.use(compression());
// app.use(session({
//     secret: '2C44-4D44-WppQ38S',
//     resave: true,
//     saveUninitialized: true
// }));

var options = {
   useMongoClient: true,
   socketTimeoutMS: 0,
   keepAlive: true,
   reconnectTries: 30
};

var  url_db = process.env.mongodb || "mongodb://localhost/ciistacna";

mongoose.connect(url_db,options, function (err) {
  if (err) {
    console.log("aqui el error db",err);
  }
  console.log("DB connected");
});

// Loading config
global.$config = require('konfig')({path: 'src/config'}).config;




// Layout setup
//var exphbs = require('express-handlebars');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// Handlebars setup
/*var hbsHelpers = require('./lib/helpers/handlebars');
app.engine($config.views.engine, exphbs({
    extname: $config.views.extension,
    defaultLayout: $config.views,
    layoutsDir: __dirname + '/views/',
    helpers: hbsHelpers
}));
*/
// view engine setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Setup favicon
//var favicon = require('serve-favicon');
//app.use(favicon(__dirname + '/public/favicon.ico'));


// Routes
app.use('/',index)
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.listen($config.serverPort);

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var expressValidator = require('express-validator');
var session      = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var models = require("./models");
var User = models.User;
var cors = require('cors');
var ApiError = require('./lib/api-error');
var routes = require('./routes/route');
var apiUtils = require('./lib/api-utils');

var config = require( './config' );
config.db.user = config.db.username;

var sessionStore = new MySQLStore( config.db );
var app = express();
apiUtils.inject(app);

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'app')));
app.use(session({
  key: config.cookieName,
  secret: config.cookieSecret,
  store: sessionStore,
  resave: true,
  saveUninitialized: true
}));

app.use('/', routes);


app.use(function(req, res, next) {
  next( ApiError.create('Not found', 404 ));
});



// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log( err );
    res.apiError( err );
    next && next();
  });
}


app.use(function(err, req, res, next) {
  console.log( err );
  res.apiError( err );
  next && next();
});
// error handlers

module.exports = app;

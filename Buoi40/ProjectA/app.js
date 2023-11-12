require("dotenv").config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout')
const localPassport = require('./passport/localPassport');

var app = express();



app.use(
  session({
    secret: "F8",
    resave: false,
    saveUninitialized: false
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, done) {
  process.nextTick(function() {
    return done(null, {
      id: user.id,
     
    });
  });

});

passport.deserializeUser(async function(user, done) {

  process.nextTick(function() {
    return done(null, user);
  });
});
passport.use(
  'local',
  localPassport,
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', loginRouter);
    
app.use('/', indexRouter);
app.use('/logout', logoutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

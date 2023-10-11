require("dotenv").config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const LocalStrategy = require('passport-local').Strategy;
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout')
const forgotPassRouter = require('./routes/forgotPass');
const localPassport = require('./passport/localPassport');
const facebookPassport = require("./passport/facebookPassport");
const githubPassport = require("./passport/githubPassport");
const model = require("./models/index")
var app = express();
app.use(
  session({
    secret: "F8",
    resave: false,
    saveUninitialized: false
  })
)
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
passport.use(
  'facebook',
  facebookPassport,
);

passport.use(
  'github',
  githubPassport,
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

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/forgot-password', forgotPassRouter);
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

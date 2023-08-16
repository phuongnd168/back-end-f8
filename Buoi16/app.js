var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const LoginController = require("./controller/LoginController");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var flash = require("connect-flash");

var app = express();
app.use(
  session({
    secret: "keyboard cat",
  })
);

app.get("/", function (req, res) {
  if (req.session.login) {
    res.render("index", { req });
  } else {
    res.redirect("/dang-nhap");
  }
});

app.get("/dang-nhap", function (req, res) {
  if (req.session.login) {
    res.redirect("/");
  } else {
    req.session.login = false;
    req.session.user = "phuong@gmail.com";
    req.session.pass = "123";
    const { errEmail, errPassword } = req.session;
    if (errEmail || errPassword) {
      req.session.alert = "Vui lòng nhập đầy đủ thông tin";
    }

    const { alert } = req.session;
    delete req.session.errEmail;
    delete req.session.errPassword;
    delete req.session.alert;
    return res.render("../views/login", { errEmail, errPassword, alert });
  }
});
app.get("/logout", function(req,res){
  req.session.alert = "Đăng xuất thành công"
  const {alert} = req.session
  req.session.login = false;
  res.redirect("/dang-nhap")
  
})
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

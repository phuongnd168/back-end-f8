var flash = require("connect-flash");
var express = require("express");
var app = express();
module.exports = {
  login: (req, res) => {
    if (!req.session.login) {
      return res.redirect("/dang-nhap");
    } else {
      return res.redirect("/");
    }
  },
  loginHandle: (req, res) => {
    const { email, password } = req.body;

    if (email === req.session.user && password === req.session.pass) {
      req.session.login = true;
      res.redirect("/");
    } else {
      if (email === "") {
        req.session.errEmail = "Vui lòng nhập email";
      }
      if (password === "") {
        req.session.errPassword = "Vui lòng nhập password";
      }
      if (email !== req.session.email || password !== req.session.password) {
        req.session.alert = "Tài khoản hoặc mật khẩu không chính xác";
      }
      res.redirect("/dang-nhap");
    }
  },
 
};

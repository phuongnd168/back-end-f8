var express = require('express');

var router = express.Router();
const isLogin = (req, res, next) => {
  if(!req.user){
    res.clearCookie("user")
    res.clearCookie("auth")
    res.redirect("/login")
    return
  }
  next()
}
const checkAuth = (req, res, next) => {
  if(req.cookies.auth){
    res.cookie("user", req.user, {maxAge: 3600000, httpOnly: true});
    res.redirect("http://localhost:3001/")
    return
  }
  next()
}
/* GET home page. */

router.get('/', isLogin, checkAuth, function(req, res, next) {

  res.cookie("user", req.user, {maxAge: 3600000, httpOnly: true});
  res.render('index');
});

module.exports = router;

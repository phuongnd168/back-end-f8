var express = require('express');
const LoginController = require('../controllers/LoginController');
var router = express.Router();
const passport = require('passport');
const isLogin = (req, res, next) => {
    if(req.user){
      res.redirect("/")
      return
    }
    res.clearCookie("user")
    res.clearCookie("auth")
    next()
}
/* GET home page. */

router.get('/', isLogin, LoginController.index);
router.post('/', passport.authenticate('local', {  
  failureRedirect: '/login', failureFlash: true, successRedirect: "/"
}))

module.exports = router;

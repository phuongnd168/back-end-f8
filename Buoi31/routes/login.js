var express = require('express');
const LoginController = require('../controllers/LoginController');
var router = express.Router();
const passport = require('passport');
const isLogin = (req, res, next) => {
    if(req.user){
      res.redirect("/")
      return
    }
    next()
}
/* GET home page. */
router.get('/', isLogin, LoginController.index);
router.post('/', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true, successRedirect: "/" }))
router.get('/facebook/redirect', passport.authenticate('facebook'))
router.get('/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: "/login",
  failureMessage: true,
  successRedirect: "/",
  
}))

router.get('/github/redirect', passport.authenticate('github'))
router.get('/github/callback', passport.authenticate('github', {
  failureRedirect: "/login",
  failureMessage: true,
  successRedirect: "/",

  
}))
module.exports = router;

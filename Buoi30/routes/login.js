var express = require('express');
const LoginController = require('../controllers/LoginController');
var router = express.Router();
const passport = require('passport');
const isLogin = (req, res, next) => {
    if(req.user){
      res.redirect("/")
    }
    next()
}
/* GET home page. */
router.get('/', isLogin, LoginController.index);
router.post('/', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), 
LoginController.handleLogin)

module.exports = router;

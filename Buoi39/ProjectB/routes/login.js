var express = require('express');
const LoginController = require('../controllers/LoginController');
var router = express.Router();

const isLogin = (req, res, next) => {

  if(req.cookies.user){
    req.session.user = req.cookies.user
    res.redirect("/")
    return
  }
 
    next()
}

/* GET home page. */
router.get('/', isLogin,  LoginController.index);
module.exports = router;

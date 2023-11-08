var express = require('express');

var router = express.Router();
const isLogin = (req, res, next) => {
  if(!req.user){
    res.redirect("/login")
    return
  }
  next()
}


  


/* GET home page. */

router.get('/', isLogin, function(req, res, next) {
  res.render('index');
});

module.exports = router;

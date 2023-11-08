var express = require('express');
const LoginController = require('../controllers/LoginController');
var router = express.Router();

const isLogin = (req, res, next) => {
    if(req.user){
      res.redirect("/")
      return
    }
    next()
}
/* GET home page. */
router.get('/',  LoginController.index);
router.post("/", function(req, res, next) {
  let request = new Request(req);
  let response = new Response(res);

  return oauth.authenticate(request, response)
    .then(function(token) {

      res.locals.oauth = {token: token};
      
      next();
    })
    .catch(function(err) {
      // handle error condition
    })
 },)

module.exports = router;

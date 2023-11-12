var express = require('express');
var router = express.Router();
const passport = require("passport");
const md5 = require("md5")
const GuestMiddleware = require('../middlewares/GuestMiddleware');
const AuthController = require('../controllers/AuthController');

router.get("/oauth", GuestMiddleware, AuthController.index)
router.post(
  "/oauth",
  passport.authenticate("local", {successRedirect: `http://localhost:3000/callback?code=${md5(new Date().getTime()+Math.random())}`}), 
);

module.exports = router;
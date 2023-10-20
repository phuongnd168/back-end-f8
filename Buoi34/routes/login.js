var express = require("express");
var router = express.Router();
const passport = require("passport");
const LoginController = require("../controllers/LoginController");
const isLogin = (req, res, next) => {
    if (req.user) {
      res.redirect("/");
      return
    }
  
    next();
  };
  
router.get("/", isLogin, LoginController.login);
router.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
    successRedirect: "/"
  })
);

module.exports = router;
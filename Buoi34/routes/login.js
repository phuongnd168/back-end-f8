var express = require("express");
var router = express.Router();
const passport = require("passport");
const LoginController = require("../controllers/LoginController");
const GuestMiddleware = require("../middlewares/GuestMiddleware");

router.get("/", GuestMiddleware, LoginController.login);
router.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
    successRedirect: "/"
  })
);

module.exports = router;
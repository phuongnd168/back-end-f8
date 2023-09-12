var express = require("express");
var router = express.Router();

const LoginController = require("../controller/LoginController");

router.get(
  "/",
  (req, res, next) => {
    if (req.session.login) {
      res.redirect("/");
    } else {
      next();
    }
  },
  LoginController.index
);
router.post("/", LoginController.loginHandle);
module.exports = router;

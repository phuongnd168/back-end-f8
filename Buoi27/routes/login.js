var express = require("express");
var router = express.Router();

const LoginController = require("../controllers/LoginController");
const LoginValidate = require("../middlewares/LoginValidate");

router.get(
  "/",
  LoginController.index
);

router.post(
    "/",
    LoginValidate(),
    LoginController.loginHandle
  );
module.exports = router;

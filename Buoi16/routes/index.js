var express = require("express");
var router = express.Router();
const LoginController = require("../controller/LoginController");

/* GET home page. */
// router.get("/dang-nhap", LoginController.login);
router.post("/dang-nhap", LoginController.loginHandle);

module.exports = router;

var express = require("express");
var router = express.Router();

const RegisterController = require("../controller/RegisterController")

router.get("/", RegisterController.index);
router.post("/", RegisterController.registerHandle);
module.exports = router;

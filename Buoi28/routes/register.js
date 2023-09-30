var express = require("express");
var router = express.Router();

const RegisterController = require("../controllers/RegisterController");
const RegisterValidate = require("../middlewares/RegisterValidate")

router.get(
  "/",
  RegisterController.index
);

router.post(
    "/",
    RegisterValidate(),
    RegisterController.handleRegister
  );
module.exports = router;

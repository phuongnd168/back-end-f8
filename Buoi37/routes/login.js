var express = require('express');

const LoginController = require('../controllers/LoginController');
var router = express.Router();


router.post("/", LoginController.login);

module.exports = router;

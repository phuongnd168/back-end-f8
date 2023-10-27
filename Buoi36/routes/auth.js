var express = require('express');
const AuthController = require('../controllers/AuthController');
var router = express.Router();


router.post("/", AuthController.login);

module.exports = router;

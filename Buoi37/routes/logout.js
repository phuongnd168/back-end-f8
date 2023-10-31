var express = require('express');
const LogoutController = require('../controllers/LogoutController');
var router = express.Router();


router.post("/", LogoutController.logout);

module.exports = router;

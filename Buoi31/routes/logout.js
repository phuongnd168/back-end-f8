var express = require('express');
const LogoutController = require('../controllers/LogoutController');
var router = express.Router();

router.get("/", LogoutController.logout);


module.exports = router;

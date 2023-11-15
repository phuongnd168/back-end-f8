var express = require('express');
const LoginController = require('../controllers/LoginController');
var router = express.Router();


const GuestMiddleware = require('../middlewares/GuestMiddleware');


router.get("/", GuestMiddleware, LoginController.index);

module.exports = router;
var express = require('express');
var router = express.Router();
const AuthMiddleware = require('../middlewares/AuthMiddleware');
const checkMiddleware = require('../middlewares/checkMiddleware');
const model = require("../models/index")
const {Op} = require("sequelize");
const checkTokenMiddleware = require('../middlewares/checkTokenMiddleware');
/* GET home page. */

router.get('/', checkMiddleware, AuthMiddleware, checkTokenMiddleware, async (req, res) => {


    res.render("index")
});

module.exports = router;

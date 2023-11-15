var express = require('express');
var router = express.Router();
const AuthMiddleware = require('../middlewares/AuthMiddleware');
const AuthController = require('../controllers/AuthController');
const checkTokenMiddleware = require('../middlewares/checkTokenMiddleware');

/* GET home page. */
router.get('/callback', AuthController.redirectCallback);
router.get('/verify/:token', AuthController.verify);
router.get('/', AuthMiddleware, checkTokenMiddleware, (req, res) => {

    res.render("index")

});

module.exports = router;

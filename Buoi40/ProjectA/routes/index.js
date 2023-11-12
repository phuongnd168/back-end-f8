var express = require('express');
var router = express.Router();
const AuthMiddleware = require('../middlewares/AuthMiddleware');
const AuthController = require('../controllers/AuthController');

/* GET home page. */
router.get('/callback', AuthController.redirectCallback);
router.get('/verify/:token', AuthController.verify);
router.get('/', AuthMiddleware, (req, res) => {
    
    res.render("index")
});

module.exports = router;

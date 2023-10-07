var express = require('express');
const ForgotPass = require('../controllers/ForgotPassController');
var router = express.Router();
const jwt = require('jsonwebtoken')
/* GET home page. */
router.get('/', ForgotPass.index);
router.post('/', ForgotPass.handleForgotPass);
router.get('/verify/:token', function(req, res, next){
    const {token} = req.params

    try {
        var decoded = jwt.verify(token, 'secret');
    if(decoded){
        next()
    }
    } catch(err) {
    
        res.send("<h1>Link xác thực đã hết hạn hoặc không tồn tại</h1>")
        
    }
}, ForgotPass.resetPassword);
router.post('/verify/:token', function(req, res, next){
    const {token} = req.params

    try {
        var decoded = jwt.verify(token, 'secret');
    if(decoded){
        next()
    }
    } catch(err) {
    
        res.send("<h1>Link xác thực đã hết hạn hoặc không tồn tại</h1>")
        
    }
}, ForgotPass.handleResetPass)
module.exports = router;

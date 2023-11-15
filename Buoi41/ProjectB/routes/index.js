var express = require('express');
var router = express.Router();
const AuthMiddleware = require('../middlewares/AuthMiddleware');
const checkMiddleware = require('../middlewares/checkMiddleware');
const DeviceDetector = require('node-device-detector');
const model = require("../models/index")
const {Op} = require("sequelize")
/* GET home page. */

router.get('/', checkMiddleware, AuthMiddleware, async (req, res) => {
    const detector = new DeviceDetector({
        clientIndexes: true,
        deviceIndexes: true,
        deviceAliasCode: false,
    });
    const userAgent =  req.get("User-Agent")
    const result = detector.detect(userAgent);
    if(result){
        if(!req.cookies.device){
            res.cookie("device",JSON.stringify(result.device),  {maxAge: 3600000, httpOnly: true})
        }
        const device = await model.device.findOne({
            where:{
                [Op.and]: [ {name: JSON.stringify(result.device)}, { id: req.session.user}],  
               
            }
        })
        if(!device){
            delete req.session.user
            res.clearCookie("device")
            res.clearCookie("user")
            res.redirect("http://localhost:3001/login")
        }
    }
   
   

    res.render("index")
});

module.exports = router;

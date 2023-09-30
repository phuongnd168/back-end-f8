var express = require("express");
var router = express.Router();
const db =  require('../models/index');
const User = db.User;


router.get("/:id", async function(req, res, next){
 

    if(req.params.id===req.session.token){
    
      const user = await User.findOne({
        where: {
          email: req.session.user
        }
      });
      if(user.role){
        res.send("Link đã hết hạn hoặc không tồn tại")
      }
      else{
        req.session.login=true
        await User.update({ status: 1 }, {
          where: {
            email: req.session.user
          }
        });
        delete req.session.token 
        res.redirect("/customers")
      }
  
    }
    else{
      res.send("Link đã hết hạn hoặc không tồn tại")
    }
   
  })
  module.exports = router;
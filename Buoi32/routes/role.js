var express = require('express');
var router = express.Router();
const model = require("../models/index")
const User = model.User
const RoleController = require('../controllers/RoleController');
const isLogout = (req, res, next) => {
    if (!req.user) {
      res.redirect("/login");
      return
    }
    next();
  };
router.get('/', isLogout, RoleController.index);
router.get('/add', isLogout, RoleController.addRole);
router.post('/add', isLogout, RoleController.handleAddRole);
router.get('/edit/:id', isLogout, async function(req, res, next){
    const { id } = req.params
    const role = await model.Role.findByPk(id)
    if(!role){
        res.send("Đường dẫn không tồn tại")    
        return 
    }
    next()
}, RoleController.updateRole);
router.post('/edit/:id', isLogout, RoleController.handleUpdateRole);
module.exports = router;

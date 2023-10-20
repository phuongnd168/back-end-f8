var express = require("express");
var router = express.Router();
const PermissionMiddleware = require("../middlewares/PermissionMiddleware")
const UserController = require("../controllers/UserController");
const isLogout = (req, res, next) => {
    if (!req.user) {
      res.redirect("/login");
      return
    }
  
    next();
  };
/* GET users listing. */
router.get("/", isLogout, async function(req, res, next){
  const permissions = await PermissionMiddleware(req)
  if(!permissions?.includes("users.read")){
    req.flash("err", "Không có quyền")
    res.redirect("/")
    return
  }
  next()
}, UserController.index);

router.get("/permission/:id", isLogout, isLogout, async function(req, res, next){
  const permissions = await PermissionMiddleware(req)
  if(!permissions?.includes("users.read")){
    req.flash("err", "Không có quyền")
    res.redirect("/")
    return
  }
  next()
}, UserController.permission);

router.post("/permission/:id", isLogout, UserController.handlePermission);

module.exports = router;
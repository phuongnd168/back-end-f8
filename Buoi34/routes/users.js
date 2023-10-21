var express = require("express");
var router = express.Router();
const PermissionMiddleware = require("../middlewares/PermissionMiddleware")
const UserController = require("../controllers/UserController");

/* GET users listing. */
router.get("/", async function(req, res, next){
  const permissions = await PermissionMiddleware(req)
  if(!permissions?.includes("users.read")){
    req.flash("err", "Không có quyền")
    res.redirect("/")
    return
  }
  next()
}, UserController.index);

router.get("/permission/:id", async function(req, res, next){
  const permissions = await PermissionMiddleware(req)
  if(!permissions?.includes("users.read")){
    req.flash("err", "Không có quyền")
    res.redirect("/")
    return
  }
  next()
}, UserController.permission);

router.post("/permission/:id", UserController.handlePermission);

module.exports = router;
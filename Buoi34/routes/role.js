var express = require("express");
var router = express.Router();
const PermissionMiddleware = require("../middlewares/PermissionMiddleware")
const RoleController = require("../controllers/RoleController");

/* GET users listing. */
router.get("/", async function(req, res, next){
  const permissions = await PermissionMiddleware(req)
  if(!permissions?.includes("users.read")){
    req.flash("err", "Không có quyền")
    res.redirect("/")
    return
  }
  next()
}, RoleController.index);
router.get("/add", async function(req, res, next){
  const permissions = await PermissionMiddleware(req)
  if(!permissions?.includes("users.add")){
    req.flash("err", "Không có quyền")
    res.redirect("/role")
    return
  }
  next()
}, RoleController.add);
router.post("/add", RoleController.handleAdd);
router.get("/edit/:id", async function(req, res, next){
  const permissions = await PermissionMiddleware(req)
  if(!permissions?.includes("users.update")){
    req.flash("err", "Không có quyền")
    res.redirect("/role")
    return
  }
  next()
}, RoleController.edit);
router.post("/edit/:id", RoleController.handleEdit);


router.post("/delete/:id", async function(req, res, next){
  const permissions = await PermissionMiddleware(req)
  if(!permissions?.includes("users.delete")){
    req.flash("err", "Không có quyền")
    res.redirect("/role")
    return
  }
  next()
}, RoleController.delete)

module.exports = router;
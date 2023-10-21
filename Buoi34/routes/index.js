var express = require("express");
var router = express.Router();
const PermissionMiddleware = require("../middlewares/PermissionMiddleware")

/* GET home page. */
router.get("/", async function(req, res, next){
    const permissions = await PermissionMiddleware(req)
    if(!permissions?.includes("users.read")){
      const err = req.flash("err")
      res.render("index", {layout: "layout_permission", err,  title: "Hello"})
      return
    }
    next()
  },
  function (req, res, next) {
  const err = req.flash("err")
  res.render("index", { title: "Hello", err });
});

module.exports = router;
var express = require("express");
const ShortLinkController = require("../controllers/ShortLinkController");
var router = express.Router();
const model = require("../models/index")
const isLogout = (req, res, next) => {
    if (!req.user) {
      res.redirect("/login");
      return
    }
  
    next();
  };
const isErr = async (req, res, next) => {
  const data = await model.short_link.findByPk(req.params.id, {include: model.User})
 
  
  if(!data){
    res.send("Đường dẫn không tồn tại")
    return
  }
  
  if(data?.User?.id !== req.user.id){
    res.send("Không có quyền")
    return
  }
  else{
    next()
  }

}

router.get("/", isLogout, ShortLinkController.index);

router.post("/", isLogout, ShortLinkController.handleShortLink);
router.get("/manage", isLogout, ShortLinkController.manage);
router.get("/delete/:id", isLogout, isErr, ShortLinkController.delete);
router.get("/edit/:id",  isLogout, isErr, ShortLinkController.edit);
router.post("/edit/:id", isLogout, isErr, ShortLinkController.handleEdit);

module.exports = router;
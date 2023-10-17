var express = require("express");
const ShortLinkController = require("../controllers/ShortLinkController");
var router = express.Router();
const isLogout = (req, res, next) => {
    if (!req.user) {
      res.redirect("/login");
      return
    }
  
    next();
  };
  


router.get("/", isLogout, ShortLinkController.index);

router.post("/", isLogout, ShortLinkController.handleShortLink);
router.get("/manage", isLogout, ShortLinkController.manage);
router.get("/delete/:id", isLogout, ShortLinkController.delete);
router.get("/edit/:id", isLogout, ShortLinkController.edit);
router.post("/edit/:id", isLogout, ShortLinkController.handleEdit);

module.exports = router;
var express = require('express');
var router = express.Router();
const UserController = require("../controllers/UserController")
const RateLimit = require("../middlewares/RateLimit")
const PermissionMiddleware = require("../middlewares/PermissionMiddleware");


/* GET users listing. */
router.put("/:id", PermissionMiddleware, RateLimit, UserController.put)
router.patch("/:id", PermissionMiddleware, RateLimit, UserController.patch)
router.delete("/:id", PermissionMiddleware, RateLimit, UserController.delete)
module.exports = router;

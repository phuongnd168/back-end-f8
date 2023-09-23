var express = require('express');
var router = express.Router();
const CustomerController = require("../controllers/CustomerController")
const CustomerValidate = require("../middlewares/CustomerValidate")
const UpdateValidate = require("../middlewares/UpdateValidate")

router.get('/', CustomerController.index);
router.get('/create', CustomerController.create);
router.post('/create', CustomerValidate(), CustomerController.store)
router.get('/edit/:id', CustomerController.edit);
router.post('/edit/:id', UpdateValidate(), CustomerController.handleEdit)

router.post('/delete_by_id', CustomerController.deleteById)
module.exports = router;

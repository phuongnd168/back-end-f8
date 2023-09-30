var express = require('express');
var router = express.Router();

const CustomerValidate = require("../middlewares/CustomerValidate")
const UpdateValidate = require("../middlewares/UpdateValidate")


const AdminController = require('../controllers/AdminController');


router.get('/', AdminController.index);
router.get('/create', AdminController.create);
router.post('/create', CustomerValidate(), AdminController.store)
router.get('/edit/:id', AdminController.edit);
router.post('/edit/:id', UpdateValidate(), AdminController.handleEdit)
router.post('/delete_by_id', AdminController.deleteById)

module.exports = router;
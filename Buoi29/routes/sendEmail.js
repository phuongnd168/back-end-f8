var express = require('express');
const SendMailController = require('../controllers/SendMailController');
var router = express.Router();
const path = require("path")
/* GET users listing. */
router.get('/', SendMailController.index);
router.post('/', SendMailController.handleSendEmail);
router.get('/history', SendMailController.indexHistory);
router.get('/history/:id', SendMailController.detailContent);

module.exports = router;

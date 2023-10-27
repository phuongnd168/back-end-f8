var express = require('express');


const UploadFileController = require('../controllers/UploadFileController');
const UploadFileMiddleware = require('../middlewares/UploadFileMiddleware');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

var router = express.Router();


router.post('/', AuthMiddleware, UploadFileMiddleware, UploadFileController.upload)
router.get('/', AuthMiddleware, UploadFileController.getData)
module.exports = router;

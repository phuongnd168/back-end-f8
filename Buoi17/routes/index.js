var express = require('express');
var router = express.Router();

const IndexController = require("../controllers/IndexController");
const AboutController = require("../controllers/AboutController");
const ContactController = require("../controllers/ContactController");
const GalleryController = require("../controllers/GalleryController");
const ServicesController = require("../controllers/ServicesController");


/* GET home page. */
router.get('/', IndexController.index);
router.get('/about', AboutController.about);
router.get('/contact', ContactController.contact);
router.get('/gallery', GalleryController.gallery);
router.get('/services', ServicesController.services);

module.exports = router;

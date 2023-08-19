const Services = require("../models/serviceModel");
const Gallery = require("../models/galleryModel");
const Contact = require("../models/contactModel");
const About = require("../models/aboutModel");

module.exports = {
    index: (req, res) => {
      const services = Services.getData();
      const gallery = Gallery.getData();
      const contact = Contact.getData();
      const about = About.getData();

      res.render("index", {services, gallery, contact, about});
    },
  }
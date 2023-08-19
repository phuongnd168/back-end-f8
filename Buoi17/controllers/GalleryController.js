const Gallery = require("../models/galleryModel");

module.exports = {
    gallery: (req, res) => {
      const gallery = Gallery.getData();
      res.render("gallery", {gallery});
    },
  }
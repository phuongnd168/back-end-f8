const About = require("../models/aboutModel");

module.exports = {
  about: (req, res) => {
    const about = About.getData();
    res.render("about", {about});
  },
}
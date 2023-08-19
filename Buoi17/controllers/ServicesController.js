const Services = require("../models/serviceModel");

module.exports = {
    services: (req, res) => {
      const services = Services.getData();
      res.render("services", {services});
    },
  }
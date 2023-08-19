const Contact = require("../models/contactModel");

module.exports = {
    contact: (req, res) => {
      const contact = Contact.getData();
      res.render("contact", {contact});
    },
  }
const SendMail = require("../jobs/SendMail");
const Event = require("../core/Event");
module.exports = {
  sendMail: (req, res) => {
    res.render("users/sendMail");
  },

  handleSendMail: async (req, res) => {
    const emailData = [
      {
        name: "Phương",
        email: "user1@gmail.com"
      },
      {
        name: "Phương",
        email: "user2@gmail.com"
      },
      {
        name: "Phương",
        email: "user3@gmail.com"
      },
      {
        name: "Phương",
        email: "user4@gmail.com"
      },
      {
        name: "Phương",
        email: "user5@gmail.com"
      },
      {
        name: "Phương",
        email: "user6@gmail.com"
      },
    ]
    emailData.forEach(async(e) => {
      console.log(e)
      const name = e.name
      const email = e.email
      new Event(
        new SendMail({
          name,
          email,
        }),
      );
    });
   

    res.send("Hello");
  },
};

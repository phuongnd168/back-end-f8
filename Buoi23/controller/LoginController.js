//Customer Model
const { DataTypes } = require("sequelize");
const md5 = require("../utils/md5");
const Customer = async () => {
  const sequelize = await require("../utils/db");

  return sequelize.define(
    "Customer",
    {
      id: {
        type: DataTypes.NUMBER,
        primaryKey: true,
      },

      email: {
        type: DataTypes.STRING,
      },

      password: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
module.exports = {
  index: (req, res) => {
    req.session.login = false;
    const err = "";
    res.render("login/index", { err });
  },
  loginHandle: async (req, res) => {
    const { emailLogin, passwordLogin } = req.body;
    const customer = await Customer();

    const customerEmail = await customer.findOne({
      where: { email: emailLogin },
    });
    if (customerEmail) {
      const json = JSON.stringify(customerEmail);
      const data = JSON.parse(json);
      if (emailLogin === data.email && md5(passwordLogin) === data.password) {
        req.session.login = true;
        res.redirect("/");
      } else if (passwordLogin !== data.password) {
        const err = "Sai password";
        res.render("login/index", { err });
      }
    } else {
      if (!emailLogin) {
        const err = "Vui lòng nhập email";
        res.render("login/index", { err });
      } else if (!passwordLogin) {
        const err = "Vui lòng nhập password";
        res.render("login/index", { err });
      } else {
        const err = "Sai email";
        res.render("login/index", { err });
      }
    }
  },
};

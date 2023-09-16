const Customer = require("../models/LoginModels");
const md5 = require("../utils/md5");

module.exports = {
  index: (req, res) => {
    req.session.login = false;
    const err = "";
    const emailLogin = ""
    const passwordLogin = ""
    res.render("login/index", { err, emailLogin, passwordLogin });
  },
  loginHandle: async (req, res) => {
    const { emailLogin, passwordLogin } = req.body;
    const customer = await Customer;

    const customerEmail = await customer.findOne({
      where: { email: emailLogin },
    });
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (customerEmail) {
      const json = JSON.stringify(customerEmail);
      const data = JSON.parse(json);
      console.log(data)
      if (emailLogin === data.email && md5(passwordLogin) === data.password && data.status) {
        req.session.login = true;
        res.redirect("/");
      } else if (md5(passwordLogin) !== data.password) {
        const err = "Sai password";
        res.render("login/index", { err, emailLogin, passwordLogin });
      }else if(!data.status){
        const err = "Tài khoản chưa kích hoạt"
        res.render("login/index", { err, emailLogin, passwordLogin })
      }
    } else {
      if (!emailLogin) {
        const err = "Vui lòng nhập email";
        res.render("login/index", { err, emailLogin, passwordLogin });
      } else if (!passwordLogin) {
        const err = "Vui lòng nhập password";
        res.render("login/index", { err, emailLogin, passwordLogin });
      } else if (!emailLogin.match(validRegex)) {
        const err = "Email không đúng định dạng";
        res.render("login/index", { err, emailLogin, passwordLogin });
      } else {
        const err = "Sai email";
        res.render("login/index", { err, emailLogin, passwordLogin });
      }
    }
  },
};

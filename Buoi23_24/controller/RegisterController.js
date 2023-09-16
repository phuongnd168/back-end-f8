const Customer = require("../models/RegisterModels");
const md5 = require("../utils/md5")
module.exports = {
    index: (req, res) => {
        const err = "";
        const success = ""
        const emailRegister = ""
        const passwordRegister = ""
        const nameRegister = ""
        res.render("register/index", { err, success, nameRegister, emailRegister, passwordRegister });
    },
    
    registerHandle: async (req, res) => {
        let { emailRegister, passwordRegister, nameRegister } = req.body; 
        const customer = await Customer;
        const customerEmail = await customer.findOne({
            where: { email: emailRegister },
          });
          const validRegex =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
          console.log(customerEmail)
          let err =""
          let success=""
        if(customerEmail){
             err = "Email đã tồn tại";
            res.render("register/index", {err, success, nameRegister, emailRegister, passwordRegister })
        }else{
            if (!nameRegister) {
                 err = "Vui lòng nhập tên";
                res.render("register/index", { err, success, nameRegister, emailRegister, passwordRegister });
              } 
                else if (!emailRegister) {
                 err = "Vui lòng nhập email";
                res.render("register/index", { err, success, nameRegister, emailRegister, passwordRegister });
              } else if (!passwordRegister) {
                 err = "Vui lòng nhập password";
                res.render("register/index", { err, success, nameRegister, emailRegister, passwordRegister });
              } else if (!emailRegister.match(validRegex)) {
                 err = "Email không đúng định dạng";
                res.render("register/index", { err, success, nameRegister, emailRegister, passwordRegister });
              } else {
                const createAccount = await customer.create({
                    name: nameRegister,
                    email: emailRegister,
                    password: md5(passwordRegister),    
                });
                 success = "Đăng ký thành công"
                 err = ""
                nameRegister=""
                emailRegister=""
                passwordRegister=""
                res.render("register/index", {err, success, nameRegister, emailRegister, passwordRegister });
              }
               
          
        }
       
    }
}
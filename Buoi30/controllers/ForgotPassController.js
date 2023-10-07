const model = require("../models/index")
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer")
const bcrypt = require('bcrypt')
module.exports = {
    index: (req, res) => {
      
        const success = req.flash("success")
        const error = req.flash("error")
        res.render("forgot_password/index", {success, error})
    },
    handleForgotPass: async (req, res) => {
        const {email} = req.body
       
        const user = await model.User.findOne({
            where:{
                email
            }
        }) 
        if(user){
            const token = jwt.sign({ id: user.id }, 'secret',{ expiresIn: '15m' });
           
            const transporter = nodemailer.createTransport({
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_PORT,
                secure: process.env.MAIL_SECURE,
                auth: {
                  user: process.env.MAIL_USERNAME,
                  pass: process.env.MAIL_PASSWORD,
                },
              });
              console.log(transporter)
          
              const info = await transporter.sendMail({
                from: `Phương <${process.env.MAIL_FROM}>`, 
                to: email, 
                subject: "Đặt lại mật khẩu",
                html: '<p>Click <a href="http://localhost:3000/forgot-password/verify/' + token + '">here</a> to reset password</p>',
          
              },async function(err, info){
               
                if (err) {
                    req.flash("error", "Xảy ra lỗi khi gửi mail")
                    res.redirect("/forgot-password")
                } else {
                    
                    req.flash("success", "Vui lòng kiểm tra email để đặt lại mật khẩu")
                    res.redirect("/forgot-password")
                }
                
            });
  
        }
        else{
            req.flash("error", "Email không tồn tại")
            res.redirect("/forgot-password")
        }
        
    },
    resetPassword: (req, res) => {
        const error = req.flash("error")
        res.render("reset_password/index", {error})
    }, 
    handleResetPass: async (req, res) => {
        const {token} = req.params
        const {passwordNew, rePassword} = req.body
        if(!passwordNew || !rePassword){
            req.flash("error", "Vui lòng nhập đầy đủ thông tin")
            res.redirect("/forgot-password/verify/"+ token)
        }
        else if(passwordNew !== rePassword){
            req.flash("error", "Mật khẩu nhập lại không khớp")
            res.redirect("/forgot-password/verify/"+ token)
        }
        else{
            var decoded = jwt.verify(token, 'secret');
            if(decoded){
                const salt = 10;
                bcrypt.hash(passwordNew, salt, async function (err, hash) {
                    await model.User.update({ password: hash }, {
                        where: {
                          id: decoded.id
                        }
                      });
                    decoded = {}
                })
                req.flash("success", "Thay đổi mật khẩu thành công")
                
                res.redirect("/login")
            }
            else{
                res.send("<h1>Link xác thực đã hết hạn hoặc không tồn tại</h1>")
            }
            
        }

    }
}
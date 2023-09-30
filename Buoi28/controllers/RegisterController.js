const model = require("../models/index")
const User = model.User
const validate = require("../utils/validate")
const {validationResult} = require('express-validator')
const md5 = require("md5")
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport3')
const {google} = require('googleapis')
const CLIENT_ID = "946885519258-rcr06m6gb1dh568i141fa5vl2qcas3eu.apps.googleusercontent.com"
const ClIENT_SECRET = "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"
const REDIRECT_URI = "https://developers.google.com/oauthplayground"
const REFRESH_TOKEN = "1//04zk4pu3u6wCeCgYIARAAGAQSNwF-L9Irf9CHajWOSuw8zR5qBlU8LiUFaWwd6HSnPM7r9QlvWaWmJrpjqkjTQJTkphFdXCSA-7A"
module.exports = {
    index: (req, res) => {
        const msg = req.flash("msg")
        const errors = req.flash("errors")
        let email = req.flash("email")
        let password= req.flash("password")
        let password2= req.flash("password2")
        let name = req.flash("name")
        let err = req.flash("err")
        const msgOk = req.flash("msgOk")
      
        if(msgOk.length){
             name = ""
             email = ""
             password = ""
             password2 = ""
        }
        res.render("register/index", {msg, errors, validate, email, password, password2, name, msgOk, err})
    },
    handleRegister: async (req, res) => {
        const errors = validationResult(req)
        const { email, password, name, password2 } = req.body;
        req.flash("email", email)
        req.flash("password", password)
        req.flash("password2", password2)
        req.flash("name", name)
        if(errors.isEmpty()){
            if(password2!==password){
                req.flash('msg', 'Vui lòng kiểm tra lại thông tin')
                req.flash('err', 'Mật khẩu phải trùng khớp')
                res.redirect("/register")
            }
            else{
                const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, ClIENT_SECRET, REDIRECT_URI)
                oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})
                const accessToken = await oAuth2Client.getAccessToken()
                req.session.token = accessToken.token
                req.session.user = email
                var transporter = nodemailer.createTransport(smtpTransport({
                    service: 'gmail',
                    host: 'smtp.gmail.com',
                    auth: {
                      user: 'dauphaiphuong168@gmail.com',
                      pass: 'xjir epdh oafx rtov',
                      type: 'OAuth2',
                      clientId: CLIENT_ID,
                      clientSecret: ClIENT_SECRET,
                      refreshToken: REFRESH_TOKEN,
                      accessToken: accessToken,
                     
                    }
                  }));
                 
                  
                  var mailOptions = {
                    from: 'dauphaiphuong168@gmail.com',
                    to: email,
                    subject: 'Kích hoạt tài khoản',
                    html: '<p>Click <a href="http://localhost:3000/verify/' + accessToken.token + '">here</a> to active and login</p>',
                
                };
               
                  transporter.sendMail(mailOptions, async function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                     

                      console.log('Email sent: ' + info.response);
                    }
                  });  
                req.flash('msgOk', `Đăng ký thành công, vui lòng kiểm tra email để kích hoạt tài khoản`)
                req.body.password = md5(req.body.password)
                await User.create(req.body)
                res.redirect("/register")
            }
           
        }
        else{

            req.flash('errors', errors.array())
            req.flash('msg', 'Vui lòng kiểm tra lại thông tin')
            res.redirect("/register")
    
        }

       
    }

}
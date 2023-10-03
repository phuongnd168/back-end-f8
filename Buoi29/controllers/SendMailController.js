const nodemailer =require("nodemailer")
const model = require("../models/index")
const sentEmailHistory = model.sent_email_history

const moment = require("moment")

module.exports = {
    index: (req, res) => {
        const err = req.flash("err")
        const success = req.flash("success")
        res.render("send_email/index", {err, success})
    },
    handleSendEmail: async (req, res) => {
        const {emailSentTo, title, content} = req.body
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: process.env.MAIL_SECURE,
            auth: {
              user: process.env.MAIL_USERNAME,
              pass: process.env.MAIL_PASSWORD,
            },
          });
        
      
          const info = await transporter.sendMail({
            from: `Phương <${process.env.MAIL_FROM}>`, 
            to: emailSentTo, 
            subject: title,
            text: content,
      
          },async function(err, info){
            
            if (err) {
                req.flash("err", "Xảy ra lỗi khi gửi mail")
                res.redirect("/send-email")
            } else {
                await sentEmailHistory.create({
                    email_sent_to: emailSentTo,
                    title: title,
                    status: 0,
                    sent_time: new Date(),
                    content:content
                })
                
                req.flash("success", "Gửi mail thành công")
                res.redirect("/send-email")
            }
            
        });
              
       
    },
    indexHistory: async (req, res) => {
        const data = await sentEmailHistory.findAll()
  
        res.render("send_email/history", {data, moment})
    },
    detailContent: async (req, res) => {
  
        const data = await sentEmailHistory.findByPk(req.params.id)
        if(!data.status){
            await sentEmailHistory.update({ status: 1 }, {
                where: {
                  id: req.params.id
                }
              });
        }
      
        res.render("send_email/detail", {data})
    }


}
const nodemailer = require("nodemailer");
class SendMail {
  constructor(job) {
    this.job = job;
  }

  handle = async () => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "dauphaiphuong168@gmail.com",
        pass: "rgrv msnp arns krph",
      },
    })
      return await transporter.sendMail({
        from: `Phương <dauphaiphuong168@gmail.com>`, // sender address
        to: this.job.email, // list of receivers
        subject: `Xin chào: ${this.job.name}`, // Subject line
        html: `Xin chào bạn ${this.job.name}, tôi đang test email`,
      });
   
     
  };
}

module.exports = SendMail;

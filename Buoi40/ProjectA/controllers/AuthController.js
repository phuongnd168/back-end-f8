const model = require("../models/index")
const client = model.client
const authorize = model.authorize
const User = model.User

const checkMail = model.checkMail
const { Op } = require("sequelize");
const DeviceDetector = require('node-device-detector');
const nodemailer = require("nodemailer")
const md5 = require("md5")
module.exports = {
    index: async (req, res) => {
        const {client_id, callback} = req.query
        
        const data = await client.findOne({
            where: {
                [Op.and]: [{ clientId: client_id ?? "" }, { callback: callback ?? "" }],             
        }
        })

        if(!data){
            res.redirect("http://localhost:3001/login")
            return
        }
        res.render("login/index")
      
     
    },
    redirectCallback: async (req, res) => {
        const {code} = req.query     
        const user = await User.findByPk(req.user.id)
        const indexOfFirst = req.headers.referer.indexOf("=")
        const indexOfLast = req.headers.referer.indexOf("&")
        const clientId = req.headers.referer.slice(indexOfFirst+1, indexOfLast)
        await authorize.create({
            clientId: clientId,
            user_id: req.user.id,
            code: code,

        })
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: "dauphaiphuong168@gmail.com",
              pass: "qnba jczz xptv bwbe",
            },
          });
        
          const token = md5(new Date().getTime()+Math.random())

          const info = await transporter.sendMail({
            from: "Phương <dauphaiphuong168@gmail.com>", 
            to: user.email, 
            subject: "Xác minh 2 bước",
            html: '<p>Click vào <a href="http://localhost:3000/verify/' + token + '">link</a> để xác minh 2 bước</p>'
      
          })
          if(info){
            await checkMail.create({
                token: token
            })
          }
          res.send("Vui lòng kiểm tra email để thực hiện xác minh")

    },
    verify: async (req, res) => {
        const check = await checkMail.findOne({
            where: {
                token: req.params.token
            }
        })
        if(check){
            const detector = new DeviceDetector({
                clientIndexes: true,
                deviceIndexes: true,
                deviceAliasCode: false,
            });
            const userAgent = req.get("User-Agent")
            const result = detector.detect(userAgent);
            if(result){
                const device = await model.device.findOne({
                    where:{
                        [Op.and]: [ {name: JSON.stringify(result.device)}, { id: req.user.id}],  
                       
                    }
                })
        
                if(!device){
                    await model.device.create({
                        name: JSON.stringify(result.device),
                        user_id: req.user.id
                    })
                }
            }

            res.cookie("user", req.user.id, {maxAge: 3600000, httpOnly: true})
            res.redirect(`http://localhost:3001`)
            return 
        }
        res.send("Not Found")

    }
}
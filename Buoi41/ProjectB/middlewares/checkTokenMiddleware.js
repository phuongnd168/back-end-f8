const model = require("../models/index")
const loginToken = model.login_token
const sha1 = require("sha1")
module.exports = async (req, res, next) => {
    const tokenUser = await loginToken.findOne({
        where: {
            user_id: req.cookies.user
        }
    })
    
    const token = sha1(new Date().getTime()+ Math.random())
   
    if(tokenUser){
        await loginToken.destroy({
            where: {
                user_id: req.cookies.user
            }
        })
    }
    await loginToken.create({
        user_id: req.cookies.user,
        token: token
    })
    res.cookie("token", token, {maxAge: 3600000, httpOnly: true})
    next()
}
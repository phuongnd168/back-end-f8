const model = require("../models/index")
const loginToken = model.login_token
module.exports = async (req, res, next) => {
    if(!req.session.user){

        res.redirect("/login")
        return
    }
    const user = await loginToken.findOne({
        where: {
            user_id: req.cookies.user
        }
    })

    if(req.cookies.token && user && user.token !== req.cookies.token){
     
            res.clearCookie("user")
            res.clearCookie("token")
            res.clearCookie("auth")
            delete req.session.user
            res.redirect('/login');
            return
    }
    next()
}
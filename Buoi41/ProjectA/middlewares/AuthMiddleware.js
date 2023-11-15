const model = require("../models/index")
const loginToken = model.login_token
module.exports = async (req, res, next) => {

    if(!req.cookies.user){
        res.redirect("/login/oauth")
        res.clearCookie("auth")
        res.clearCookie("user")
        res.clearCookie("token")
        return
    }
    const user = await loginToken.findOne({
        where: {
            user_id: req.cookies.user
        }
    })

    if(req.cookies.token && user && user.token !== req.cookies.token){
        const logout = () => {
        req.logout(function(err) {
            if (err) { return next(err); }
                res.clearCookie("user")
                res.clearCookie("token")
                res.clearCookie("auth")
                res.redirect('/login');
                return
            });
        }
        logout()
        return
    }
    
    next()
}
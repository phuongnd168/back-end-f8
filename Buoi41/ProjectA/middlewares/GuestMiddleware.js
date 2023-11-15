module.exports = (req, res, next) => {
    if(req.cookies.user){
        res.redirect("/")
        return
    }
    res.clearCookie("user")
    res.clearCookie("token")
    res.clearCookie("auth")
    next()
}
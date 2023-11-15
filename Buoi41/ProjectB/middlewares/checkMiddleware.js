module.exports = (req, res, next) => {
    if(!req.cookies.user){
        res.redirect("/login")
        return
    }
    req.session.user = req.cookies.user
    next()
}
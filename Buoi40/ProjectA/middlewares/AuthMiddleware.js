module.exports = (req, res, next) => {

    if(!req.cookies.user){
        res.redirect("/login/oauth")
        return
    }
   
    next()
}
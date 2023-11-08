module.exports = {
    index: (req, res) => {

        const error = req.flash("error")

        if(error[0] === 'Missing credentials'){
            error[0] = "Vui lòng điền đầy đủ thông tin"
        }
        if(req.headers.referer==="http://localhost:3001/"){
            res.cookie("auth", "123", {maxAge: 3600000, httpOnly: true});
        }
        res.render("login/index", {error})
    },
   
}
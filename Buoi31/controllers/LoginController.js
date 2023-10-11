module.exports = {
    index: (req, res) => {
        
        const error = req.flash("error")
        const success = req.flash("success")

        if(error[0] === 'Missing credentials'){
            error[0] = "Vui lòng điền đầy đủ thông tin"
        }
        res.render("login/index", {error ,  success})
    },
   
}
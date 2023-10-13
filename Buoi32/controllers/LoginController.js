module.exports = {
    login: async (req, res) => {
      const error = req.flash("error")

      if(error[0] === 'Missing credentials'){
          error[0] = "Vui lòng điền đầy đủ thông tin"
      }
      res.render("login/index", {error});
    },
  

}
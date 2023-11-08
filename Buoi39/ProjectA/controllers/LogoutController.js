module.exports = {
    logout: (req, res, next) => {
        req.logout(function (err) {
          if (err) {
            return next(err);
          }
         
          if(req.cookies.auth){
            res.clearCookie("user")
            res.clearCookie("auth")
            res.redirect("http://localhost:3001/")
            return
          }
  
          
          res.clearCookie("user")
          res.clearCookie("auth")
          res.redirect("/login");
        });
      }
}
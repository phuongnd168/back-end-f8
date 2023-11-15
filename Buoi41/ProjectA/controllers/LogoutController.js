
module.exports = {
  logout: (req, res, next) => {
      req.logout(function (err) {
        if (err) {
          return next(err);
        }
        res.clearCookie("user")
        res.clearCookie("token")
        res.clearCookie("auth")
        res.redirect("http://localhost:3001/login");
        return
      });
    }
}
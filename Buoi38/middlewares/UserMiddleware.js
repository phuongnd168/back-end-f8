const fs = require('fs')
module.exports = (req, res, next) => {
        if(req.cookies.users){
            try {
                fs.readFile(`data/${req.cookies.users}.json`, "utf8", function(err, data){
                    if(err) throw err;
                    const users = JSON.parse(data)
                    res.render("users/index", {users})
                });
            } catch (error) {
                console.log(error)
            }
            return
        }
        next()
}
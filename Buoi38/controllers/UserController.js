const { v4: uuid } = require('uuid');
const path = require("path")
const fs = require('fs')
const model = require("../models/index")
const User = model.User
module.exports = {
    index: async (req, res) => {
        const users = await User.findAll({})
        const cookieName = "users"
        const cookieValue = uuid()
        if (!fs.existsSync("./data")){
            fs.mkdirSync("./data");
        }
        const filePath = path.dirname(__dirname) + `/data/${cookieValue}.json`
        fs.appendFile(filePath, JSON.stringify(users), function(err) {
		    if (err) { 
                throw err 
            }else{
                res.cookie(cookieName, cookieValue, {maxAge: 900000, httpOnly: true});
                res.render("users/index", {users})
            }
        })
      
    }
}
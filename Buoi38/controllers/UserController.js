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
        if (!fs.existsSync("./cache")){
            fs.mkdirSync("./cache");
        }
        const filePath = path.dirname(__dirname) + `/cache/${cookieValue}.json`
        try {
            fs.appendFile(filePath, JSON.stringify(users), function(err) {
                if (err) { 
                    throw err 
                }else{
                    res.cookie(cookieName, cookieValue, {maxAge: 900000, httpOnly: true});
                    res.render("users/index", {users})
                }
            })
        } catch (error) {
            console.log(error)
        }
      
      
    }
}
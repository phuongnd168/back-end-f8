const model = require("../models/index")
const User = model.User
module.exports = async (req, res, next) => {
    const user = await User.findByPk(req.params.id)
    
    if(user && !user.api_key){  
        res.status(403).json({
            error: "error",
            message: "forbidden"
        })
    }
    else{
        next()
    }

}

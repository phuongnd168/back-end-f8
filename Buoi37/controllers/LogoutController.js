
const jwt = require("../utils/jwt");
const model = require("../models/index");
const User = model.User;
const black_lists = model.black_lists
module.exports = {
    logout: async(req, res) => {
 
    const authorization = req.headers["authorization"];
    if(!authorization){
        res.status(401).json({
            status: "error",
            message: "Unauthorize",
          });
        return
    }
    const token = authorization.replace("Bearer", "").trim();
    const black_list = await black_lists.findOne({where:{   
        accessToken: token
    }})
    if(black_list){
        res.status(401).json({
            status: "error",
            message: "accessToken does not exits",
          });
        return
    }
  

    try {
      const decodeAccess = jwt.decode(token);
      if(!decodeAccess){
        res.status(401).json({
            status: "error",
            message: "Unauthorize",
          });
        return;
      }

      const user = await User.findOne({
        where: {
            id: decodeAccess.userId,
        },
      });
   
      if (!user) {
        res.status(401).json({
          status: "error",
          message: "Unauthorize",
        });
        return;
      }
        await black_lists.create({accessToken: token})
        const updateStatus = await User.update({refreshToken: null}, {
            where: {
                id: user.id
            }
        })
        if (!updateStatus) {
            res.status(500).json({
              status: "error",
              message: "Server Error",
            });
            return;
        }
        res.json({
            status: "success",
            message: "Log out successfully",
        });
        return;
      
     
    } catch (e) {
      res.status(401).json({
        status: "error",
        message: "Unauthorize",
      });
      return;
    }
    }
}
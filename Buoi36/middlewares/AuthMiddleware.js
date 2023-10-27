
const jwt = require("jsonwebtoken");
const model = require("../models/index");
const User = model.User;

module.exports = async (req, res, next) => {
    const { JWT_SECRET } = process.env;
    const authorization = req.headers["authorization"];
    if(!authorization){
        res.status(401).json({
            status: "error",
            message: "Unauthorize",
          });
        return
    }
    const token = authorization.replace("Bearer", "").trim();
    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      if (decoded) {
        const { userId } = decoded.data;
        const user = await User.findByPk(userId);
        if (!user) {
          res.json({
            status: "error",
            message: "User not exist",
          });
          return;
        }
        next()
      }
    } catch (e) {
      res.status(401).json({
        status: "error",
        message: "Unauthorize",
      });
    }
}
const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt");
const model = require("../models/index");
const User = model.User;

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
      res.status(400).json({
        status: "error",
        message: "Email and password is required",
      });
      return;
    }
    const user = await User.findOne({
      where: {
        email,
      },
    });
   
    if (!user) {
      res.status(400).json({
        status: "error",
        message: "Wrong account or password",
      });
      return;
    }
    const { password: hash } = user;
    const status = bcrypt.compareSync(password, hash);
    if (!status) {
      res.status(400).json({
        status: "error",
        message: "Wrong account or password",
      });
      return;
    }
    if(user.refreshToken){
      const decode = jwt.decode(user.refreshToken);
      if(decode){
        res.status(400).json({
          status: "error",
          message: "You are logged in",
        });
        return;
      }
    }
    const token = jwt.createToken({ userId: user.id });
    const refreshToken = jwt.createRefresh();
    const updateStatus = await User.update(
      {
        refreshToken: refreshToken,
      },
      {
        where: {
          id: user.id,
        },
      },
    );
    if (!updateStatus) {
      res.status(500).json({
        status: "error",
        message: "Server Error",
      });
      return;
    }

    res.json({
      status: "success",
      accessToken: token,
      refreshToken,
    });
  },
};
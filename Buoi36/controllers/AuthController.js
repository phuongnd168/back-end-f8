const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
   
    const { JWT_SECRET, JWT_EXPIRE } = process.env;
  
    const token = jwt.sign(
      {
        data: {
          userId: user.id,
        },
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE * 60 },
    );

    res.json({
      status: "success",
      accessToken: token,
    });
  },
};
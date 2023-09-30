const { check } = require('express-validator');
const model = require("../models/index")
const User = model.User
const { where } = require('sequelize');
let passwordValue= ""
let password2Value= ""
module.exports = () => {
 return [
    
    check('name', "Tên bắt buộc phải nhập").notEmpty(),
    check('name', "Tên phải từ 5 ký tự trở lên").isLength({min: 5}),
    check('email', "Email bắt buộc phải nhập").notEmpty(),
    check('email', "Email không đúng định dạng").isEmail(),
    check('password', "Mật khẩu bắt buộc phải nhập").notEmpty(),
 
    check('password', "Mật khẩu không đủ mạnh").isStrongPassword({
         minLength: 6,
         minLowercase: 1,
         minUppercase: 1,
         minNumbers: 1,
         minSymbols: 1,
}),
check('password2', "Mật khẩu bắt buộc phải nhập").notEmpty(),
check('email').custom(async(emailValue)=>{
  
   const users = await User
   const user = await users.findOne({where: {
      email: emailValue
   }
   })
   if(user){
      throw new Error("Email đã tồn tại")
   }
}),

  
]

}
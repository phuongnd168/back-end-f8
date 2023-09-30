const { check } = require('express-validator');
const db =  require('../models/index');

const { where } = require('sequelize');
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
check('email').custom(async(emailValue)=>{
   //Truy vấn database
   const customer = db.Customer
   const customerData = await customer.findOne({where: {
      email: emailValue
   }
   })
   if(customerData){
      throw new Error("Email đã tồn tại")
   }
})
  
]

}
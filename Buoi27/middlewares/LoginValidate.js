const { check } = require('express-validator');

const { where } = require('sequelize');
module.exports = () => {
 return [

    check('email', "Email bắt buộc phải nhập").notEmpty(),
    check('email', "Email không đúng định dạng").isEmail(),
 
    check('password', "Mật khẩu bắt buộc phải nhập").notEmpty(),
]

}
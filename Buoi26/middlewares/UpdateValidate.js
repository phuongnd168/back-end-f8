const { check } = require('express-validator');

const { where } = require('sequelize');
module.exports = () => {
 return [
    check('name', "Tên bắt buộc phải nhập").notEmpty(),
    check('name', "Tên phải từ 5 ký tự trở lên").isLength({min: 5}),
    check('email', "Email bắt buộc phải nhập").notEmpty(),
    check('email', "Email không đúng định dạng").isEmail()
 
       
]

}
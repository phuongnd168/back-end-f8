
const moment = require("moment");
const { Op, NUMBER } = require("sequelize");
const { getPaginateUrl } = require("../utils/url");

const {validationResult} = require('express-validator')
const validate = require("../utils/validate")
const db =  require('../models/index');
var md5 = require('md5');

const User = db.User;

module.exports = {
  index: async (req, res) => {

    const { keyword, status } = req.query;
    const { PER_PAGE } = process.env;

    const customer = db.Customer
    
  
    const filters = {};
    const user = await User.findOne({
      where: {
        email: req.session.user
      }
    });

    const customerByUser = await user.getCustomer();

    if(customerByUser.length){
      filters.user_id = customerByUser[0].user_id
    }
    else{
      filters.user_id = ""
    }


    if (status === "active" || status === "inactive") {
      filters.status = status === "active" ? 1 : 0;
    }
    
    if (keyword) {
      filters[Op.or] = [
        {
          name: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          email: {
            [Op.like]: `%${keyword}%`,
          },
        },
      ];
    }
    //Tổng số bản ghi
  
    const totalCountObj = await customer.findAndCountAll({
      where: filters,
    });
    
    const totalCount = totalCountObj.count;

    //Tổng số trang
    const totalPage = Math.ceil(totalCount / PER_PAGE);

    //Trang hiện tại
    let { page } = req.query;
    if (!page || page < 1 || page > totalPage) {
      page = 1;
    }
  
    //Tính offset
    const offset = (page - 1) * PER_PAGE;
    const msg = req.flash("msg")
    const msgDelete = req.flash("msgDelete")
    const errDelete = req.flash("errDelete")
    const customers = await customer.findAll({
     
      order: [["id", "DESC"]],
      where: filters,
      limit: +PER_PAGE,
      offset: offset,
    });
  
    res.render("customers/index", {
      errDelete,
      customers,
      moment,
      totalPage,
      page,
      req,
      getPaginateUrl,
      msg,
      msgDelete
    });
  },
  create: async (req, res) => {
    
 
    const msg = req.flash("msg")
    const errors = req.flash("errors")
    
    res.render("customers/create", { msg, errors, validate})

  },
  store: async (req, res) => {
    const user = await User.findOne({
      where: {
        email: req.session.user
      }
    });

    
    const errors = validationResult(req)

    if(errors.isEmpty()){ 
      const customer = db.Customer
      req.body.password = md5(req.body.password)
      req.body.user_id = user.id
      customer.create(req.body)
      

      req.flash("msg", "Thêm mới thành công")
      res.redirect("/customers")
    }else{
      req.flash('errors', errors.array())
      req.flash('msg', 'Vui lòng nhập đầy đủ thông tin')
      res.redirect("/customers/create")
    }
   
  },
  edit: async (req, res) => {
   
    const customers = db.Customer
    const customer = await customers.findOne({ where: { id: req.params.id } });
    const msgEdit = req.flash("msgEdit")
    const msg = req.flash("msg")
    const errors = req.flash("errors")
    const emailIdentical = req.flash("emailIdentical")
    const err = req.flash("err")
    res.render("customers/edit", {customer, msgEdit,  msg, errors, validate, emailIdentical, err})
  },
  handleEdit: async (req, res) => {
    const errors = validationResult(req)
    const customers = db.Customer 
    const customer = await customers.findOne({ where: { id: req.params.id } });
    const customerIdentical  = await customers.findOne({ where: { email: req.body.email } });
    if(customerIdentical && customerIdentical.email !== customer.email){
      req.flash("emailIdentical", "Email đã tồn tại")
      req.flash("err","Vui lòng nhập đầy đủ thông tin")
      res.redirect(`/customers/edit/${req.params.id}`)
    }
    else{
      if(errors.isEmpty()){
        const customer = db.Customer
        const customerEdit = await customer.update({ name: req.body.name, email: req.body.email, status: req.body.status }, {
          where: {
            id: +req.params.id
          }
        });
        req.flash("msgEdit", "Sửa thành công")
        res.redirect(`/customers/edit/${req.params.id}`)
      }
     
       
      else{
   
        req.flash('errors', errors.array())
        req.flash('msg', 'Vui lòng nhập đầy đủ thông tin')
        res.redirect(`/customers/edit/${req.params.id}`)
      }
    }
   

  },

  deleteById: async (req, res) => {
   
    const data = Object.keys(req.body)

    const value = Object.values(req.body)
    console.log(data, value)
    if(value.toString().includes("Xóa")){
      const customer = db.Customer
      const customerDelete = await customer.destroy({
        where: {
          id: data[0]
        }
      });
      req.flash("msgDelete", "Xóa thành công")
    
  
      res.redirect("/customers")
    
    }
    else if(data.toString().includes("all")){
      const user = await User.findOne({
        where: {
          email: req.session.user
        }
      });
      const customerByUser = await user.getCustomer();
      const user_id = customerByUser[0].user_id
      const Customer = db.Customer
      const customers = await Customer.destroy({
        where: {
          user_id: user_id
        }
      })

        
        req.flash("msgDelete", "Xóa thành công")
      
    
        res.redirect("/customers")
       
   
    }
    else{
      if(!data.length){
        req.flash("errDelete", "Chưa chọn bản ghi nào")
        res.redirect("/customers")
      }else{
        const customer = db.Customer
       const customerDelete = await customer.destroy({
        where: {
          email: data
        }
      });
      req.flash("msgDelete", "Xóa thành công")
    
  
      res.redirect("/customers")
      }
      
    
    }
   
  }
};

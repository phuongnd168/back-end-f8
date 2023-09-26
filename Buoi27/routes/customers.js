var express = require('express');
var router = express.Router();
const CustomerController = require("../controllers/CustomerController")
const CustomerValidate = require("../middlewares/CustomerValidate")
const UpdateValidate = require("../middlewares/UpdateValidate")
const db =  require('../models/index');
var createError = require("http-errors");

const User = db.User;
const Customer = db.Customer;

    router.get('/', CustomerController.index);
    router.get('/create', CustomerController.create);
    router.post('/create', CustomerValidate(), CustomerController.store)
    router.get('/edit/:id', async function (req, res, next){
       
        const user = await User.findOne({
            where: {
              email: req.session.user
            }
          });
          
        const customerByUser = await user.getCustomer();
        const user_id = customerByUser[0].user_id
        const customer = await Customer.findOne({
            where: {
              id: req.params.id
            }
        });
        if(customer){
            if(customer.user_id !== user_id){
                res.send("<h1>Không có quyền sửa</h1>")
              }
              else{
                next()
              }
        }
        else{
            next(createError(404));
        }
    }, CustomerController.edit);
    router.post('/edit/:id', UpdateValidate(), CustomerController.handleEdit)
    
    router.post('/delete_by_id', CustomerController.deleteById)

module.exports = router;

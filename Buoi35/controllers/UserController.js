
const bcrypt = require('bcrypt')
const model = require("../models/index")

const User = model.User
const validateEmail =  function(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
}
module.exports = {
    put: async (req, res) => {
      
        let {name, email, password} = req.body
        const {id} = req.params
        const user = await User.findByPk(id)
        if(!user){
            res.status(404).json({
                status: "error",
                error: "Not Found"
            })
            return
        }
        const errors = {}
        if(name === ""){
            errors.name = "Tên không được để trống"
        }
        else if(email === ""){
            errors.email = "Email không được để trống"
        }
        else if(password === ""){
            errors.password = "Mật khẩu không được để trống"
        }
        else if(email){
            if(!validateEmail(email)){
                errors.email = "Email không hợp lệ"
            }else{
                const userUpdate = await User.findOne({
                    where: {
                        email
                    }
                })
            
    
                if(userUpdate && user.email !== email){
                    errors.email = "User đã tồn tại"
                }
                
            }
        }
        let response = {}
        if(Object.keys(errors).length){
            Object.assign(response, {
                errors: errors,
                errorText: "Validation",
                status: "error"
            })
            res.status(400).json(response)
            return
        }
        if(password){
            const saltRounds = 10;
            const hash = bcrypt.hash(password, saltRounds);
            const passwordHash = await hash
            name = name ?? ""
            email = email ?? ""
            const data = await User.update({name, email, password: passwordHash},{
                where: {
                    id
                }
            })
           
            if(data){
                const user = await User.findByPk(id)
                Object.assign(response, {
                    status: "success",
                    data: user
                })
               
                res.status(200).json(response)
                return
            }
            return
        }

        name = name ?? ""
        email = email ?? ""
        password = password ?? ""
        const data = await User.update({name, email, password},{
            where: {
                id
            }
        })
        if(data){
            const user = await User.findByPk(id)

            Object.assign(response, {
                status: "success",
                data: user
            })
           
            res.status(200).json(response)
            return
        }
        response = {
            status: "error",
            errorText: "Server Error"
        }
        res.status(500).json(response)
       
    },
    patch: async (req, res) => {
    
        const {name, email, password} = req.body
        const {id} = req.params
        const user = await User.findByPk(id)
        if(!user){
            res.status(404).json({
                status: "error",
                error: "Not Found"
            })
            return
        }
        const errors = {}
        if(name === ""){
            errors.name = "Tên không được để trống"
        }
        else if(email === ""){
            errors.email = "Email không được để trống"
        }
        else if(password === ""){
            errors.password = "Mật khẩu không được để trống"
        }
        else if(email){
            if(!validateEmail(email)){
                errors.email = "Email không hợp lệ"
            }else{
                const userUpdate = await User.findOne({
                    where: {
                        email
                    }
                })
                if(userUpdate && user.email !== email){
                    errors.email = "User đã tồn tại"
                }
                
            }
        }
        let response = {}
        if(Object.keys(errors).length){
            Object.assign(response, {
                errors: errors,
                errorText: "Validation",
                status: "error"
            })
            res.status(400).json(response)
            return
        }
        if(password){
            const saltRounds = 10;
            const hash = bcrypt.hash(password, saltRounds);
            const passwordHash = await hash
            const data = await User.update({name, email, password:passwordHash},{
                where: {
                    id
                }
            })
            if(data){
                const user = await User.findByPk(id)
                Object.assign(response, {
                    status: "success",
                    data: user
                })
               
                res.status(200).json(response)
                return
            }
            return
        }
    
        const data = await User.update({name, email, password},{
            where: {
                id
            }
        })
        if(data){
            const user = await User.findByPk(id)
            Object.assign(response, {
                status: "success",
                data: user
            })
           
            res.status(200).json(response)
            return
        }
        response = {
            status: "error",
            errorText: "Server Error"
        }
        res.status(500).json(response)
       
    }, 
    delete: async (req, res) => {
        const {id} = req.params
        const user = await User.findByPk(id)
        if(user){
            const userDelete = await User.destroy({
                where: {
                    id
                }
            })
            res.status(200).json({
                status: "success",
                response: userDelete
            })
            return
        }
        else if(!user) {
            res.status(404).json({
                status: "error",
                error: "Not Found"
            })
            return
        }
        const response = {
            status: "error",
            errorText: "Server Error"
        }
        res.status(500).json(response)
        
        
  
       
    }
}

const model = require("../models/index")
const User = model.User
const Role = model.Role
const Permission = model.Permission
module.exports = {
    index: async (req, res) => {
        const role = await model.Role.findAll()
        const success = req.flash("success")
        res.render("role/index", {role, success })
    },
    addRole: async (req, res) => {
    
        const error = req.flash("error")
      
        res.render("role/role_add", {error})
        
    },
    handleAddRole: async (req, res) => {
        const {role, permission} = req.body
        if(!role){
            req.flash("error","Vui lòng nhập tên role")
            res.redirect("/role/add")
        }
        else{
            const newRole = await Role.create({ name: role});
            if(typeof permission === 'string'){
                await newRole.addPermission(await Permission.findOne({
                    where:{
                        value: permission
                }}))
                req.flash("success","Thêm thành công")
                res.redirect("/role")
            }
            else if(permission?.length){
                for(let i = 0; i < permission.length; i++){
                    await newRole.addPermission(await Permission.findOne({
                        where:{
                            value: permission[i]
                    }}))
                }
                req.flash("success","Thêm thành công")
                res.redirect("/role")
            }else{
                req.flash("error","Vui lòng chọn quyền")
                res.redirect("/role/add")
            }
            
        }
    },
    updateRole: async (req, res) => {
        const { id } = req.params
        const role = await model.Role.findByPk(id, {include: model.Permission})
        let permissions = await role.Permissions
        permissions = permissions.map(permission => {
            return permission.value
        });
        const error = req.flash("error")
        res.render("role/role_update", {role, permissions, id, error})
    },
    handleUpdateRole: async (req, res) => {
        const permissionAll = ["Thêm", "Sửa", "Xóa", "Xem"]
        const { id } = req.params
        const {role, permission} = req.body
        const roleUpdate = await Role.findByPk(id)
        if(!role){
            req.flash("error","Vui lòng nhập tên role")
            res.redirect("/role/edit/"+id)
        }else{
            await Role.update({ name: role }, {
                where: {
                  id: id,
                },
            }
            ) 
            if(typeof permission === 'string'){
                    for(let i = 0; i < permissionAll.length; i++){
                        await roleUpdate.removePermission(await Permission.findOne({
                            where:{
                                value: permissionAll[i]
                        }}))
                    }
                    await roleUpdate.addPermission(await Permission.findOne({
                        where:{
                            value: permission
                    }}))
                     req.flash("success","Sửa thành công")
                    res.redirect("/role")
            }
            else if(permission?.length){
                for(let i = 0; i < permissionAll.length; i++){
                    await roleUpdate.removePermission(await Permission.findOne({
                        where:{
                            value: permissionAll[i]
                    }}))
                }
                for(let i = 0; i < permission.length; i++){
                    await roleUpdate.addPermission(await Permission.findOne({
                        where:{
                            value: permission[i]
                    }}))
                }
                req.flash("success","Sửa thành công")
                res.redirect("/role")
            }
            else{
                req.flash("error","Vui lòng chọn quyền")
                res.redirect("/role/edit/"+id)
            }
            
        }  
        }
      
       
   
}

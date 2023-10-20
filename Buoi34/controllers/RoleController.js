const model = require("../models/index")
const permissionUtil = require("../utils/permission");
const Role = model.Role
const User = model.User
const Permission = model.Permission
const PermissionMiddleware = require("../middlewares/PermissionMiddleware")


module.exports = {
    index: async (req, res) => {
        const err = req.flash("err")
        const permissions = await PermissionMiddleware(req)
        const roles = await Role.findAll()
        res.render("role/index", {roles, err, permissionUtil, permissions})
    },
    add: async(req, res) => {
        res.render("role/add")
    },
    handleAdd: async(req, res) => {
        const { name, permission } = req.body;
        const role = await Role.create({
          name,
        });
    
        if (permission) {
          let dataPermission = [];
          if (typeof permission === "string") {
            dataPermission.push({
              value: permission,
            });
          } else {
            dataPermission = permission.map((item) => ({ value: item }));
          }
    
          dataPermission.forEach(async (item) => {
            const permissonIntance = await Permission.findOne({
              where: item,
            });
            if (!permissonIntance) {
              await role.createPermission(item);
            } else {
              await role.addPermission(permissonIntance);
            }
          });
        }
        res.redirect("/role")
    },
    edit: async(req, res) => {
        const { id } = req.params;
        const role = await Role.findOne({
          where: {
            id,
          },
          include: {
            model: Permission,
          },
        });
    
        const roles = await Role.findAll();
        if(role){
          const { Permissions: permissions } = role;
          res.render("role/edit", { role, roles, permissions, permissionUtil });
        }
        
        else{
          res.send("Đường dẫn không tồn tại")
        }
          
  
    
    
      
        
    },
    handleEdit: async(req, res) => {
        const { id } = req.params;

        const { name, permission } = req.body;
    
        //Cập nhật bảng role
        await Role.update(
          {
            name,
          },
          {
            where: {
              id,
            },
          },
        );
    
        const role = await Role.findOne({
          where: {
            id,
          },
        });
    
        if (permission) {
          let dataPermission = [];
          if (typeof permission === "string") {
            dataPermission.push({
              value: permission,
            });
          } else {
            dataPermission = permission.map((item) => ({ value: item }));
          }
    
          //Xóa tất cả permission theo role
          // const permissionList = await Permission.findAll();
          // await role.removePermissions(permissionList);
    
          dataPermission.forEach(async (item) => {
            const permissonIntance = await Permission.findOne({
              where: item,
            });
            if (!permissonIntance) {
              await role.createPermission(item);
            }
          });
    
          const permissonsUpdate = await Promise.all(
            dataPermission.map((item) => Permission.findOne({ where: item })),
          );
    
          role.setPermissions(permissonsUpdate);
        }
    
        res.redirect("/role/edit/" + id);
    
    },
    delete: async (req, res) => {
        const {id} = req.params
        const role = await Role.findOne({where: {id}})
        await role.removePermission(
          await Permission.findAll()
        )
        await role.removeUsers(
          await User.findOne({where: req.user.id})
        )
        await Role.destroy({
          where:{id}
        })
        if(role){
          res.redirect("/role")
        }
        else{
          res.redirect("/")
        }
       
    }
}
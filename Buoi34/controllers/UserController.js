const model = require("../models/index");
const User = model.User;
const {isRole} = require("../utils/permission")
const Role = model.Role;
module.exports = {
  index: async (req, res) => {
    const users = await User.findAll();
    res.render("users/index", { users });
  },

  permission: async (req, res) => {
    const {id} = req.params
    const roles = await Role.findAll()
    const user = await User.findOne({
      where: {
        id,
      },
      include:{
        model: Role
      }
    })
    console.log(user)
    res.render("users/permission", {roles, user, isRole});
  },

  handlePermission:async (req, res) => {
    let {roles} = req.body
    const {id} = req.params
    const user = await User.findOne({where: {id}})
    if(!user){
      res.redirect("/users")
      return
    }
    if(roles){
      roles = typeof roles === 'string' ? [roles] : roles
      const roleUpdate = await Promise.all(
        roles.map((roleId)=>Role.findOne({where: {id: roleId}}))
      )
      await user.setRoles(roleUpdate)
    }
  
    res.redirect("/users")
  },
};
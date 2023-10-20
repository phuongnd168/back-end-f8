const model = require("../models/index")
const User = model.User
const Role = model.Role
const Permission = model.Permission
module.exports = async (req) => {
    if (req.user) {
    const { id } = req.user;

    const user = await User.findOne({
      where: {
        id,
      },
      include: {
        model: Role,
      },
    });

    const roles = user.Roles;
    //Lấy tất cả permission của từng Role
    let permissions = await Promise.all(
      roles.map(async ({ id }) => {
        const role = await Role.findOne({
          where: { id },
          include: {
            model: Permission,
          },
        });

        return role.Permissions;
      }),
    );

    permissions = permissions.map((item) => {
      return item.map(({ value }) => value);
    });

    permissions = [...new Set(permissions.flat(Infinity))];
    return permissions
    
  }
}
module.exports = {
    get: (data, permission) => {
      const permissionData = data.find(({ value }) => value === permission);
      if (permissionData) {
        return permissionData.value;
      }
    },
    isRole:(roleData, roleId) => {
      return roleData.find((role)=>{
        return +role.id === roleId
      })
    },
    isPermissionAdd:(permissionData) =>{
      if(permissionData.includes("users.add")){
        return true
      }
    },
    isPermissionRead:(permissionData) =>{
      if(permissionData.includes("users.read")){
        return true
      }
    },
    isPermissionDelete:(permissionData) =>{
       if(permissionData.includes("users.delete")){
        return true
      }
    },
    isPermissionUpdate:(permissionData) =>{
      if(permissionData.includes("users.update")){
        return true
      }

    }
  };
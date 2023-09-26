'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Customer, { foreignKey: "user_id", as: "customer" });
    }
  }
  User.init( {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
    },

    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
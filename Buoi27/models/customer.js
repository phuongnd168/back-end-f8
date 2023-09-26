'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    }
  }
  Customer.init(  {
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
    status: {
      type: DataTypes.BOOLEAN,
    },
 
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};
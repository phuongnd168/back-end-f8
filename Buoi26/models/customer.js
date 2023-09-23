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
    }
  }
 
  Customer.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // Automatically gets converted to SERIAL for postgres
      }
    ,
    name:{
      type: DataTypes.STRING,
    },
    email:{
      type: DataTypes.STRING,
    },
    password:{
      type: DataTypes.STRING
    },
    status:{
      type: DataTypes.BOOLEAN,
    },
    created_at:{
      type: DataTypes.DATE
    }
      
  }, {
    timestamps:false,
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};
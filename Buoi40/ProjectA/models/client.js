'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
  
    }
  }
  client.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    clientId: DataTypes.STRING,
    clientSecret: DataTypes.STRING,
    callback: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'client',
  });
  return client;
};
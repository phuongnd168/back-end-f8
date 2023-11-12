'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
 
    }
  }
  device.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    user_id: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'device',
  });
  return device;
};
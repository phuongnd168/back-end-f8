'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class authorize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      authorize.belongsTo(models.User, {
        foreignKey: "user_id",
      });
    }
  }
  authorize.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    clientId: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    code: DataTypes.STRING,
    access_token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'authorize',
  });
  return authorize;
};
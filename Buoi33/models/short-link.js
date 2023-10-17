'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class short_link extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      short_link.belongsTo(models.User, {foreignKey: "user_id"})
    }
  }
  short_link.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    shortened_link: DataTypes.STRING,
    original_link: DataTypes.STRING,
    views: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'short_link',
  });
  return short_link;
};
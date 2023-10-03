'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sent_email_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    
    }
  }
  sent_email_history.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
    
    },
    email_sent_to: DataTypes.STRING,
    title: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    sent_time: DataTypes.DATE,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'sent_email_history',
  });
  return sent_email_history;
};
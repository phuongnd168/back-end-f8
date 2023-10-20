'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('role_permission', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'roles',
            
          },
          key: 'id'
        }
      },
      permission_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'permissions',
            
          },
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

    })
  
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('role_permission');
  }
};

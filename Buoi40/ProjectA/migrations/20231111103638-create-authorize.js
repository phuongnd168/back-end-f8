'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('authorizes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clientId: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id'
        }
      },
      code: {
        type: Sequelize.STRING
      },
      access_token: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('authorizes');
  }
};
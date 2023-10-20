'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Permissions', [{
      value: 'users.add',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      value: 'users.update',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      value: 'users.delete',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      value: 'users.read',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Permissions', null, {});
  }
};

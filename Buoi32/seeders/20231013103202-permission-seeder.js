'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Permissions', [{
      value: 'Xem',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      value: 'Sửa',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      value: 'Xóa',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      value: 'Thêm',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Permissions', null, {});
  }
};

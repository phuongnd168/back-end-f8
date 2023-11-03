'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [];
    for (let index = 0; index < 10; index++) {
        data.push({
          name: `User ${index + 1}`,
          email: `user${index + 1}@gmail.com`,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
    }
    await queryInterface.bulkInsert("users", data, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};

'use strict';
const bcrypt = require('bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hash = bcrypt.hash("123", 10);
    const passwordHash = await hash
    const data = [];
    for (let index = 0; index < 10; index++) {
        data.push({
          name: `User ${index + 1}`,
          email: `user${index + 1}@gmail.com`,
          password: passwordHash,
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

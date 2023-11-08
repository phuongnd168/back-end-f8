'use strict';
const bcrypt = require('bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const saltRounds = 10;
    const hash = bcrypt.hash("123", saltRounds);
    const passwordHash = await hash
  return queryInterface.bulkInsert('Users', [{
    name: 'Phuong',
    email: 'phuong@gmail.com',
    password: passwordHash,
    createdAt: new Date(),
    updatedAt: new Date()
  }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};

'use strict';
const bcrypt = require('bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const saltRounds = 10;
    const hash = bcrypt.hashSync("123", saltRounds);
  return queryInterface.bulkInsert('Users', [{
    name: 'Phuong',
    email: 'dauphaiphuong168@gmail.com',
    password: hash,
    createdAt: new Date(),
    updatedAt: new Date()
  }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};

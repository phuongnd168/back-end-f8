'use strict';

const md5 = require('md5');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Customers', [{
      name: 'John344343',
      email: 'example@example.com',
      password: md5("123@Aadsđs"),
      status: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'John14343',
      email: 'example1@example.com',
      password: md5("123@Aadsđs"),
      status: 1,
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Customers', null, {});
  }
};

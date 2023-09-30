'use strict';

const md5 = require('md5');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Customers', [{
      name: 'John',
      email: 'example@example.com',
      password: md5("123@Aadsđs"),
      status: 1,
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'John1',
      email: 'example1@example.com',
      password: md5("123@Aadsđs"),
      status: 1,
      user_id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'John2',
      email: 'example2@example.com',
      password: md5("123@Aadsđs"),
      status: 1,
      user_id: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'John3',
      email: 'example3@example.com',
      password: md5("123@Aadsđs"),
      status: 1,
      user_id: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Customers', null, {});
  }
};

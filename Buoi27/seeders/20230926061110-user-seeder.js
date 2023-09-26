'use strict';

const md5 = require('md5');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      name: 'Phương',
      email: 'phuong@gmail.com',
      password: md5("123"),
      role: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Phuong1',
      email: 'phuong1@gmail.com',
      password: md5("123"),
      role: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Phuong2',
      email: 'phuong2@gmail.com',
      password: md5("123"),
      role: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};

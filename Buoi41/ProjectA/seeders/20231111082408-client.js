'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Clients', [{
      name: 'F8',
      userId: 1,
      clientId: "4517683e761ea950f80b13ebc76e42bc",
      clientSecret: "38bf1eb5f05731161e48075a19411b5abc84cfad",
      callback: "http://localhost:3000/callback",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Clients', null, {});
  }
};

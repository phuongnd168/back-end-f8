'use strict';
const bcrypt = require('bcrypt')
const { generateApiKey } = require('generate-api-key');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const saltRounds = 10;
    const hash = bcrypt.hash("123", saltRounds);
    const passwordHash = await hash
    const data = [];
    for (let index = 0; index < 50; index++) {
      if(index%2===0){
        data.push({
          name: `User ${index + 1}`,
          email: `user${index + 1}@gmail.com`,
          password: passwordHash,
          api_key: generateApiKey(),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      else{
        data.push({
          name: `User ${index + 1}`,
          email: `user${index + 1}@gmail.com`,
          password: passwordHash,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
     
    }
    await queryInterface.bulkInsert("users", data, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};

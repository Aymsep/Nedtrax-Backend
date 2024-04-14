'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Retrieve UUIDs for users
    const johnDoeUserId = await queryInterface.rawSelect('User', {
      where: { email: 'john.doe@example.com' }
    }, ['uuid']);
    console.log("johnDoeUserId",johnDoeUserId);
    const janeSmithUserId = await queryInterface.rawSelect('User', {
      where: { email: 'jane.smith@example.com' }
    }, ['uuid']);

    // Insert seed data for user roles
    return queryInterface.bulkInsert('User_role', [
      {
        uuid: uuidv4(),
        userUuid: johnDoeUserId,
        role: 'manager',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uuid: uuidv4(),
        userUuid: janeSmithUserId,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User_role', null, {});
  }
};

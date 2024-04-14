'use strict';
const { v4: uuidv4 } = require('uuid');
const { User } = require('../../Config/config');
const models = require('../models'); // Import the Entity model

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    // Retrieve UUID for a user with the manager role
    const manager = await queryInterface.rawSelect('User_role', {
      where: { role: 'manager' }
    }, ['userUuid']);

    
    // Retrieve UUIDs for required entities (limit to two)
    const entities = await models.Entity.findAll({ 
      attributes: ['uuid', 'name'],
      limit: 2 // Limit to two entities
    });

    
    // Define allowed entities for the manager role
    const entityUUIDs = entities.map(entity => entity.uuid);

    
    // Insert seed data for permissions
    return queryInterface.bulkInsert('User_permission', [
      {
        // Permissions for the manager with access to the limited entities
        uuid: uuidv4(),
        userUuid: manager ,
        entityUuid: entityUUIDs[0], // Use the UUIDs of the selected entities
        permissions: [...User.Permissions],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // Permissions for the manager with access to the limited entities
        uuid: uuidv4(),
        userUuid: manager,
        entityUuid: entityUUIDs[1], // Use the UUIDs of the selected entities
        permissions: [...User.Permissions],
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    
    // Rollback logic goes here
    
    
    return queryInterface.bulkDelete('User_permission', null, {});
  }
};

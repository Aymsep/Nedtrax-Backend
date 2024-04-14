'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Entity = sequelize.define('Entity',{
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING
    }
  },{
    freezeTableName: true,
    tableName: 'Entity',

  });
  Entity.associate = (models) => {
    Entity.hasMany(models.User_permission, {
      foreignKey: 'entityUuid', // Change to correct foreign key name
      as: 'permissions'
    });
  };

  return Entity;
};

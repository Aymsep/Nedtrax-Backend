'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User_permission = sequelize.define('User_permission',{
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userUuid: {
      type: DataTypes.UUID
    },
    entityUuid: {
      type: DataTypes.UUID,
      allowNull:true
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    }
  },{
    freezeTableName: true,
    tableName: 'User_permission',

  });
  User_permission.associate = (models) => {
    User_permission.belongsTo(models.User, {
      foreignKey: 'userUuid',
    });
    User_permission.belongsTo(models.Entity, {
      foreignKey: 'entityUuid', // Change to correct foreign key name
      as: 'entity'
    });
  };
  return User_permission;
};

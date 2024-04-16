'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User',{
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    enable: {
      type: DataTypes.BOOLEAN,
      defaultValue:true
    },
  },{
    freezeTableName: true,
    tableName: 'User'
  }
  )
  //Association
  User.associate = (models) =>{
    User.hasOne(models.User_role, {
      foreignKey: 'userUuid',
      as: 'role'
    });
    User.hasMany(models.User_permission, {
      foreignKey: 'userUuid',
      as: 'permissions'
    });
  }

  //Hooks

 





  return User;
};
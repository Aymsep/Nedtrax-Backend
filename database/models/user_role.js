'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User_role = sequelize.define('User_role',{
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4
    },
    userUuid: {
      type: DataTypes.UUID
    },
    role: {
        type: DataTypes.ENUM('admin', 'customer', 'manager'),
        defaultValue: 'customer'
    }
  },{
    freezeTableName: true,
    tableName: 'User_role',
  });
  User_role.associate = models =>{
    User_role.belongsTo(models.User,{
      forgeinKey:'userUuid',
      ondelete:"CASCADE",
      as:'user'
    })
  }

  return User_role;
};

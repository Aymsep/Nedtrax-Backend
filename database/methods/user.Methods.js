const models = require('../models');
const {User} = require('../../Config/config');
const { shapeUser, shapeUserRole, shapeUserPermissions } = require('../../helpers/responseShaper');

exports.getUserByEmail = (email) => {
    try{
        const user = models.User.findOne({
            where:{
                email
            }
        })
        return user

    }catch(err){
        throw new Error(err)
    }
}

exports.addUserToDb = async (data) => {
    let transaction;

    try{
        transaction = await models.sequelize.transaction()
        const user = await models.User.create(
            data,
            {
                transaction,
            }
        )
        const userRole = await models.User_role.create(
            {
                userUuid:user.uuid,
                role:data.role
            },
            {transaction}
        )
        if(data.role !== 'admin' || data.role !== 'customer'){
            const userPermissions = await models.User_permission.create(
                {
                    userUuid:user.uuid,
                    entityUuid: '59760b02-1e45-47e5-aac1-b9ee3c11c77d',
                    permissions:[...User.Permissions]
                },
                {transaction}
            )
            await transaction.commit()
            return {
                user: shapeUser(user),
                userRole: shapeUserRole(userRole),
                userPermissions: shapeUserPermissions(userPermissions)
            };
        }

    } catch(err){
        await transaction.rollback()
        throw err;
    }
}

exports.getUserByPermissions = async (id,entityName) => {
    try{
        const user = await models.User.findOne({
            where:{
                uuid:id
            },
            include: [
                {
                    model: models.User_role,
                    as: 'role'
                },
                {
                    model: models.User_permission,
                    as: 'permissions',
                    include:[
                        {
                            model:models.Entity,
                            as:'entity',
                            where:{
                                name:entityName
                            }

                        }
                    ]
                }
            ]
        })
        return user
    } catch(err){
        throw new Error(err)
    }
}


exports.getUserById = async (id) => {
    try{
        const user = await models.User.findOne({
            where:{
                uuid:id
            }
        })
        return user
    } catch(err){
        throw new Error(err)
    }
}
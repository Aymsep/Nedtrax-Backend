const models = require('../database/models')


async function get(uuid){
    const user = await models.User.findOne({
        where: {
            uuid
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
                        as:'entity'
                    }
                ]
            }, 
        ]
    })
    console.log(user)
    return user
}

get('869622f3-c8eb-4c37-a6e8-d29f829e3c98')
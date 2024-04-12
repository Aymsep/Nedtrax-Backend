const chalk = require('chalk')
const {em,sequelize} = require('./libs/DBconnection')
const redis = require('./libs/REDISconnection')

em.on('connected',()=>{
    require('./libs/APIconnection')
})



redis.em.on('ready', ()=>{
    console.log(chalk.green.italic('[REDIS] Redis connected successfully'))
})
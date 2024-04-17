const chalk = require('chalk')
const {em,sequelize} = require('./libs/DBconnection')
const redis = require('./libs/REDISconnection')

em.on('connected',()=>{
    require('./libs/APIconnection')
})


// redis.redisClientAux.flushall().then(() => {
//     console.log('Cache cleared successfully.');
//   }).catch((error) => {
//     console.error('Error clearing cache:', error);
//   }).finally(() => {
//     // Close the Redis connection
//     redis.redisClientAux.quit();
//   });




redis.em.on('ready', ()=>{
    console.log(chalk.green.italic('[REDIS] Redis connected successfully'))
})
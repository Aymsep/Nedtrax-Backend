const {sequelize} = require('../database/models')
const envConfig = require('../database/config/config')
const chalk = require('chalk')
const events = require('events')
let eventEmitter = new events.EventEmitter()

const env = process.env.NODE_ENV
const config = envConfig[env]

console.log(chalk.blue.bold(`---------- DATABASE MODE : ${env} ----------`))

// DATABASE CONNECTION
console.log(chalk.green.italic(`------------ DATABASE CONNECTION URL : ${config.url} ------------`))


sequelize.authenticate().then(() => {
    console.log(chalk.green.italic('[POSTGRES] Connection has been established successfully on :', config.url))
    eventEmitter.emit('connected')
}).catch(err => {
    console.error(chalk.red('Unable to connect to the database:', err))
})




module.exports = {
    sequelize,
    em:eventEmitter
}



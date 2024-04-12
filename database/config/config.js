require('dotenv').config()

module.exports = {
    DEVELOPMENT: {
        url: process.env.DEV_DB_URL,
        dialect: 'postgres',
    },
    PRODUCTION: {
        url: process.env.PROD_DB_URL,
        dialect: 'postgres',
        options:{
          dialectOptions: {
            ssl: {
              require: true, // This will help you. But you will see nwe error
              rejectUnauthorized: false // This line will fix new error
            }
          },
        }
    },
}
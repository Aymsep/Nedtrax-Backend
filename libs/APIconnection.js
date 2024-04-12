const express = require('express');
const app = express();
const chalk = require('chalk');
const helmet = require('helmet')
const compression = require('compression');
const morgan = require('morgan-body');




//Api Setup
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(compression())
morgan(app)



//Routes




// Middleware for 404
app.use((req, res) => {
    return res.status(404).send({
        status: 404,
        title: 'Route Not Found!'
    });
});


// Middleware for 500
app.use((error, req, res, next) => {
    return res.status(500).send({
        status: 500,
        title: 'Error',
        detail: error.message
    })
})


console.log(chalk.blue.bold(`---------- NODE ENVIRONNEMENT: ------- ${process.env.NODE_ENV} -------`))

app.listen(process.env.PORT,(req, res) => {
    console.log(chalk.green.italic(`------------  API server running on port ${process.env.PORT} -----------`))
})








module.exports = app
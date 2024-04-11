const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const Sequelize = require('sequelize');
require('dotenv').config()


const sequelize = new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    {
        host: process.env.DB_host,
        dialect: 'postgres',
    }

)

sequelize.authenticate()
.then(()=>{
    console.log('authenticated successfully')
})
.catch(err=>{
    console.log('error connecting',err)
})

app.get('/', (req, res) => {
    res.send('Hello World! from ayman www');
});

app.get('/users', (req, res) => {
    res.json({
        user:'ayman'
    })
})

app.use((req, res) => {
    res.status(404).send('endpoint not found')
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

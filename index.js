const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('Hello World! from ayman deply');
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

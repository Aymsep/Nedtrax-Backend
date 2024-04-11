const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('Hello World! from ayman deply');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

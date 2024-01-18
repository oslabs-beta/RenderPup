const express = require ('express');
const path = require('path');
const app = express();

const PORT = 3000;

app.use(express.json())

const apiRouter = require(path.resolve(__dirname, './routers/api.js'))

app.use(express.static(path.resolve(__dirname, '../build')));

app.use('/api', apiRouter)

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

module.exports = app;
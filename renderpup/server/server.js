const express = require ('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const PORT = 3000;

const apiRouter = require(path.resolve(__dirname, './routers/api.js'))

app.use(express.static(path.resolve(__dirname, '../build')));

app.use('/api', apiRouter)

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

module.exports = app;
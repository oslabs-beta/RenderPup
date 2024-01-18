const express = require ('express');
const path = require('path');
const app = express();

const PORT = 3000;

app.use(express.static(path.resolve(__dirname, '../build')));


app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

module.exports = app;
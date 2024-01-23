const express = require ('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const PORT = 3000;

app.use(express.json())
const apiRouter = require(path.resolve(__dirname, './routers/api.js'))

app.use(express.static(path.resolve(__dirname, '../build')));

app.use('/api', apiRouter)

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
module.exports = app;
const express = require ('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');
const userController = require('./controllers/userController');

app.use(bodyParser.json());

const PORT = 3000;

app.use(express.static(path.resolve(__dirname, '../build')));

app.use(express.json())
app.use(cookieParser());
const apiRouter = require(path.resolve(__dirname, './routers/api.js'))

app.use('/api', apiRouter)

app.get('/dashboard', (req, res) => {
  res.redirect('/')
})

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
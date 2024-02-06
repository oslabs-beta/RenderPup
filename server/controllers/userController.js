const db = require('../models/model');
const bcrypt = require('bcrypt');

const userController = {};


userController.createUser = async (req, res, next) => {
    
    const { firstName, lastName, email, username, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //add RETURNING user_id into the query to return user_id out and be used
    db.query('INSERT INTO users (username, password, firstname, lastname, email) ' + `VALUES ('${username}', '${hashedPassword}', '${firstName}', '${lastName}', '${email}') RETURNING _id`)
      .then(result => {
        res.locals.userCreated = 'User created successfully';
        return next();
      })
      .catch(err => next({
        log: 'Express error handler caught unknown middleware error',
        message: { err: 'An error occurred' },
        err
      }));
};

userController.verifyUser = async (req, res, next) => {

  const { username, password } = req.body;
  const inputPassword = password;
  db.query(`SELECT password FROM users WHERE username = '${username}' `)
    .then( async (hashPassword) => {
      res.locals.passwordMatches = await bcrypt.compare(inputPassword, hashPassword.rows[0].password);
      console.log('does password match?:', res.locals.passwordMatches);
      if (res.locals.passwordMatches){
        res.cookie('token', 'user');
        return next();
      }
    })
    .catch(err => next({log: 'Express error handler caught in usercontroller.verifyUser middleware',
    message: { err: 'An error occurred during login' },
    err}))
  } 

  userController.createUserIdCookie = (req, res, next) => {
    db.query(`SELECT _id FROM users WHERE username = '${req.body.username}'`)
      .then(id => {
        res.cookie('userId', id.rows[0]._id)
        next()
      })
  }

  userController.deleteCookie = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true
    })
  }
    return next();
  }

module.exports = userController;
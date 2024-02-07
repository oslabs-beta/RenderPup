const db = require('../models/model');
const bcrypt = require('bcrypt');

const userController = {};


userController.createUser = async (req, res, next) => {
    //extract user information from the request body
    const { firstName, lastName, email, username, password } = req.body;
    //generate a salt and hash the password using bcrypt for secure storage
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //insert the new user into the database with the hashed password
    db.query('INSERT INTO users (username, password, firstname, lastname, email) ' + `VALUES ('${username}', '${hashedPassword}', '${firstName}', '${lastName}', '${email}') RETURNING _id`)
      .then(result => {
        console.log('result:', result)
        //indicate that the user was created successfully
        res.locals.userCreated = 'User created successfully';
        //pass control over to the next middleware function
        return next();
      })
      //pass an error to the next error-handling middleware function
      .catch(err => next({
        log: 'Express error handler caught unknown middleware error',
        message: { err: 'An error occurred' },
        err
      }));
};

userController.verifyUser = async (req, res, next) => {
  //extract the login credentials from the request body
  const { username, password } = req.body;
  const inputPassword = password;
  //retrieve the hashed password from the database for the given username
  db.query(`SELECT password FROM users WHERE username = '${username}' `)
    .then( async (hashPassword) => {
      //compare the input password with the hashed password from the database
      res.locals.passwordMatches = await bcrypt.compare(inputPassword, hashPassword.rows[0].password);
      //set a cookie if the password matches
      if (res.locals.passwordMatches){
        res.cookie('token', 'user');
        //pass control to the next middleware function
        return next();
      }
    })
    //pass an error to the next error-handling middleware function
    .catch(err => next({log: 'Express error handler caught in usercontroller.verifyUser middleware',
    message: { err: 'An error occurred during login' },
    err}))
  } 

  userController.createUserIdCookie = (req, res, next) => {
    //retrieve the user ID from the database based on the username
    db.query(`SELECT _id FROM users WHERE username = '${req.body.username}'`)
      .then(id => {
        //set a cookie with the user ID
        res.cookie('userId', id.rows[0]._id)
        //pass control to the next middleware function
        return next()
      })
      //pass an error to the next error-handling middleware function
      .catch(err => next({
        log: 'Express error handler caught unknown middleware error',
        message: { err: 'An error occurred' },
        err
      }));
  }

  userController.deleteCookie = (req, res, next) => {
    //retrieve the 'token' and 'userId' cookie from the request
    const token = req.cookies.token;
    const userId = req.cookies.userId;
    //clear the 'token' and 'userId' cookie if it exists
    if (token) {
    res.clearCookie('token',{
      httpOnly: true,
      secure: true
      });
    }
    if (userId) {
      res.clearCookie('userId',{
        httpOnly: true,
        secure: true
      });
    }
    //pass control to the next middleware function
    return next();
  }

module.exports = userController;
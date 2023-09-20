const UserProfile = require('../models/userProfile');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const secret = 'dasjhk28hdjksd';

const userProfileController = {};

userProfileController.createProfile = (req, res, next) => {
  const { userName, userPassword } = req.body;
  UserProfile.create( { username: userName, password: bcrypt.hashSync(userPassword, salt)})
    .then( (newUser) => {
      res.locals.newUser = newUser;
      return next();
    })
    .catch(error => {
      return next({
        log: `userProfileController.createProfile: Error: ${error}`,
        status: 400,
        message: 'userProfileController.createProfile middleware failed'
      });
    });
};

userProfileController.login =  (req, res, next) => {
  const { userNameLogin, userPasswordLogin } = req.body;

  if (!userNameLogin || !userPasswordLogin) {
    return next({
      log: 'userProfileController.login: Missing username or password',
      status: 400,
      message: 'Username and password are required for login',
    });
  }
  //need to use findOne() specifically not find()
  UserProfile.findOne({username: userNameLogin})
    .then((userDoc) => {
      const passOk = bcrypt.compareSync(userPasswordLogin, userDoc.password);
      if (passOk) {
        return next();
      }
      else {
        return res.status(400).json('Wrong Credentials');
      }
      
    })
    .catch(error => {
      return next({
        log: `userProfileController.login: Error: ${error}`,
        status: 400,
        message: 'userProfileController.login middleware failed'
      });
    });
};

module.exports = userProfileController;
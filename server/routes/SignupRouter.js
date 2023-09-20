const express = require('express');
const router = express.Router();
// const path = require('path');

const userProfileController = require('../controllers/userProfileController');
const cookieController = require('../controllers/cookieController');


//Setting up middleware Create Profile -> Setcookie SSD -> Set Session 
router.post('/signup', userProfileController.createProfile, cookieController.setSSID, (req, res) => {
  return res.status(200).json(res.locals.newUser);
});

router.post('/login', userProfileController.login, cookieController.setSSID, (req,res) => {
  return res.status(200).json();
});

module.exports = router;


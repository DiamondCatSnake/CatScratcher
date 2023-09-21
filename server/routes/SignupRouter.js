const express = require('express');
const router = express.Router();
// const path = require('path');

const userProfileController = require('../controllers/userProfileController');
const cookieController = require('../controllers/cookieController');

router.post('/signup', userProfileController.createProfile, (req, res) => {
  return res.status(200).json(res.locals.newUser);
});

router.post('/login', userProfileController.login, (req,res) => {
  return res.status(200).json(res.locals.existingUser);
});

module.exports = router;


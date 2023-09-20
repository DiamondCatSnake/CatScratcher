const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//add unique = true so two users can't have same name

const userLogin = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  
});

const UserProfile = mongoose.model('userlogin', userLogin);

module.exports = UserProfile;
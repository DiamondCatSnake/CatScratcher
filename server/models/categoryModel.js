const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  userid: String,
  name: String,
  // items: [{
  //   ref: 'task',
  //   name: String
  // }]
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;



//Each User -> References a singular category 

//Category -> Add + New Cateogry,

//Items: an array of tasks  -> How do we populate this side now? 


const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  categoryid: String,
  Task_Name: {type: String, required: true},
  Assignee: {type: [String]},
  Due_Date: Date,
  Priority: String,
  Status: String,
  Description: String, 
  Category: String,
});


const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
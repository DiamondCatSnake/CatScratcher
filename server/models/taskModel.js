const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  Task_Name: { type: String, required: true },
  Assignee: { type: [String] },
  Due_Date: Date,
  Priority: String,
  Status: String,
  Description: String,
  Category: {
    type: Schema.Types.ObjectId,
    ref: 'Category', // Reference to the Category model
  },
  User: {
    type: Schema.Types.ObjectId,
    ref: 'userLogin', // Reference to the User model 
 },
});


const Task = mongoose.model('Task', taskSchema);


/*

Task.findbyId(category._id)
.populate('categoryName')
.excec((err, category) => {
  if (err) return handleError(err)
  console.log(`We got the category name ${category}`)
})

//Find Tasks with UserID

*/

module.exports = Task;
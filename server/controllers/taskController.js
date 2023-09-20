const Task = require('../models/taskModel');

const taskController = {};

taskController.getTask = async (req, res, next) => {
  try{
    const tasks = await Task.find({});
    res.locals.task = tasks;
    return next();
  } catch (err) {
    return next({
      log: 'error occurred in getting task: ' + err,
      message: { err: 'error occurred in getting task: ' + err },
    });
  }
  
};

taskController.addTask = async (req, res, next) => {
  const {  
    Task_Name,
    Assignee,
    Due_Date,
    Priority,
    Status,
    Description,
    Category
  } = req.body.taskData;

  const {categoryId} = req.body;

  try {
    const task = await Task.create({categoryId, Task_Name, Assignee, Due_Date, Priority, Status, Description, Category});
    res.locals.task = task;
    return next();
  } catch (err) {
    return next({
      log: 'failed to create task',
      message: {err: `failed to create task: ${err}`}
    });
  }

};


taskController.removeTask = async (req, res, next) => {
  const { _id } = req.body;
  
  try {
    const deleted = await Task.findOneAndDelete({_id: _id});
    res.locals.task = deleted;
    return next();
  } catch (err) {
    return next({
      log: 'failed to delete task',
      message: {err: `failed to delete task: ${err}`}
    });
  }

};

taskController.editTask = async (req, res, next) => {
  const { _id } = req.body;
  
  try {
    const update = await Task.findOneAndUpdate({_id: _id}, req.body, {new:true});
    res.locals.task = update;
    return next();
  } catch (err) {
    return next({
      log: 'failed to update task',
      message: {err: `failed to update task: ${err}`}
    });
  }


};
module.exports = taskController;

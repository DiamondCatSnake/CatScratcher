const Task = require('../models/taskModel');
const Category = require('../models/categoryModel');


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
    Category,
    User
  } = req.body;
  console.log("TASK CONTROLLER CATEGORY", Category);
  // console.log(req.body.taskData, "REQ BODY TASK");
  console.log(req.body, "TASK CONTROLLER TASK");


  try {
    // const task = await Task.create({categoryId, Task_Name, Assignee, Due_Date, Priority, Status, Description, Category});
    const task = await Task.create({Task_Name, Assignee, Due_Date, Priority, Status, Description, Category, User});
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
  // const { _id } = req.body;
  console.log("REQ.BODY EDITING TASK", req.body);
  
  try {
    const update = await Task.findOneAndUpdate({_id: req.body._id}, req.body, {new:true});
    res.locals.task = update;
    return next();
  } catch (err) {
    return next({
      log: 'failed to update task',
      message: {err: `failed to update task: ${err}`}
    });
  }

};

taskController.findAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({User: res.locals.existingUser._id});
    res.locals.tasks = tasks;
    console.log('found some tasks', tasks);
    const categoryNames = {};
    for(const task of tasks) {
      if(!categoryNames[task.Category]) {
        const result = await Category.findOne({_id: task.Category});
        categoryNames[task.Category] = result.name;
      }
    }
    res.locals.names = categoryNames;
    console.log('CATEGORY NAMES ', res.locals.names)
    return next();
  }
  catch (err) {
    return next({
      log: 'failed to find tasks',
      message: {err: `failed to find tasks: ${err}`}
    });
  }
};

module.exports = taskController;

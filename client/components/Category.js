import React, { useState, useEffect } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';
import TaskModal from './taskModal';
import TaskDetailsModal from './taskDetailsModal';
import { api } from '../utils/api';
import { useSelector, useDispatch } from 'react-redux';
import { addNewTask, removeTask, editTask, editTitle, updateTitle, setIsEditingTitle } from '../reducers/categorySlice';


export default function Category({ category, categoryId}) {
  const title = useSelector(state => state.categories.categories[categoryId]);
  const userId = useSelector(state => state.categories.user_id);
  const categoryTasks = useSelector(state => state.categories.categories[categoryId].items);
  const isEditingTitle = useSelector(state => state.categories.isEditingTitle);

  const dispatch = useDispatch();

  const [isModalOpen, setModalOpen] = useState(false);    // Creating a new task (popup box)
  const [selectedTask, setSelectedTask] = useState(null); // Identifies already created task and you click on the edit button -> edit details

  const [isEditing, setIsEditing] = useState(false);

  /*
    ================ Title Change Handlers ================
  */
  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e) => {
    dispatch(editTitle(e.target.value));
    console.log(e.target.value, "handle title change");
  };

  const handleTitleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      try {
        await dispatch(updateTitle(categoryId));
        await api.editCategory({ _id: categoryId, name: e.target.value });
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating Redux Category:", error);
      }
    }
  };

  /*
  ============= Opening Modal handlers ================
  */
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  
  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };
  
  const handleCloseDetailsModal = () => {
    setSelectedTask(null);
  };

    /*
    ============= Task Form Submit handlers ================
  */
  const formatDueDate = (date) => {
    if (!date) return '';
    const dueDate = new Date(date);
    const month = dueDate.getMonth() + 1;
    const day = dueDate.getDate() + 1;
    const year = dueDate.getFullYear();
    return `${year}-${month}-${day}`;
    //value="2017-06-01"
    //year //month //day
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const taskData = {};
    taskData._id = selectedTask._id;
    taskData.Task_Name = selectedTask.Task_Name;
    formData.forEach((value, key) => {
      taskData[key] = value;
    });
  
    if (formData.get("Due_Date") === "") {
      // Get the specific task 
      for (const task of categoryTasks) {
        if (task._id === taskData._id) {    
          taskData["Due_Date"] = task["Due_Date"];
        }
      }
    }
    
    // Convert Due_Date to ISO format
    taskData["Due_Date"] = new Date(taskData["Due_Date"]).toISOString();
    // call API to update database Task
    const editTaskMongo = await api.editTask(taskData);
    
    // Update state upon
    if (editTaskMongo) {
      const obj = { categoryId, taskData };
      dispatch(editTask(obj));
      handleCloseDetailsModal();
    }
  };
  
  // Newly Created Task
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const taskData = {};
    formData.forEach((value, key) => {
      taskData[key] = value;
    });

    // BACKEND ADJUSTMENT TO MATCH TASK SCHEMA MODEL
    taskData.Category = categoryId;
    taskData.User = userId;

    // Send the taskData to the backend:
    // const newTask = await api.createTask(taskData, categoryId);
    const newTask = await api.createTask(taskData);
    console.log(taskData, "ADDED TASK ");
    if (newTask) {
      const obj = {categoryId, newTask};
      dispatch(addNewTask(obj));
      handleCloseModal();
    }
  };

  // Delete Task
  const handleTaskRemove = async (taskData) => {
    const removedTask = await api.removeTask({_id: taskData});
    if (removedTask){
      const obj = {categoryId, id: taskData};
      dispatch(removeTask(obj));
      handleCloseModal();
    }
  };

  return (
    <div className="category-center">
      {/* UPDATE TITLE HERE */}
      {isEditing ? (
        <input
          type="text"
          defaultValue={title.name}
          onChange={handleTitleChange}
          onKeyPress={handleTitleKeyPress}
          onBlur={() => setIsEditing(false)}
          className="category-inputTitle center-title-vertically"
        />
      ) : (
        <div className='center-title-vertically'>
          <div className="category-title" onClick={handleTitleClick}>
            <span style={{ color: 'white' }}>{category.name}</span>
            <div className='category-title-length' >
              <span style={{ color: 'black' }}>{category.items.length}</span>
            </div>
          </div>
        </div> 
      )}
      {/* Initializes droppable ID */}
      <Droppable droppableId={String(categoryId)} key={categoryId}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              background: snapshot.isDraggingOver ? '#d9d9d9' : '#ffffff',
              padding: 4,
              width: 250,
              minHeight: 500,
              backgroundColor: '#FFFFF',
              borderRadius: '0 0 10px 10px',
              border: '1px solid #ccc', 
            }}
            className='columnShadow'
          >
            {category.items.map((task, index) => (
              <Task key={task._id} task={{...task, Due_Date: formatDueDate(task.Due_Date),}} index={index} onTaskClick={handleTaskClick} onTaskRemove={handleTaskRemove}/>
            ))}
            {provided.placeholder}
            <TaskDetailsModal
              isOpen={!!selectedTask}
              onClose={handleCloseDetailsModal}
              task={selectedTask}
              onSubmit={handleEditFormSubmit}
            />
          </div>
        )}
      </Droppable>
        <button onClick={handleOpenModal} className="add-task-button">+ Task</button>
      <TaskModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleFormSubmit} />
    </div>
  );
}

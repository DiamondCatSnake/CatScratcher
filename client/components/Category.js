import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';
import TaskModal from './taskModal';
import TaskDetailsModal from './taskDetailsModal';
import { api } from '../utils/api';
import { useSelector, useDispatch } from 'react-redux';
import { addNewTask, removeTask, editTask, editTitle, updateTitle, setIsEditingTitle } from '../reducers/categorySlice';


export default function Category({ category, categoryId}) {
  const title = useSelector(state => state.categories.categories[categoryId].name);
  const categoryTasks = useSelector(state => state.categories.categories[categoryId].items);
  const isEditingTitle = useSelector(state => state.categories.isEditingTitle);

  // access specific task state, in editing its property values
  // const ntask = useSelector(state => state.tasks.task);
  const dispatch = useDispatch();

  const [isModalOpen, setModalOpen] = useState(false);    // Creating a new task (popup box)
  const [selectedTask, setSelectedTask] = useState(null); // Identifies already created task and you click on the edit button -> edit details

  const [isEditing, setIsEditing] = useState(false);

 
  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e) => {
    dispatch(editTitle(e.target.value));
  };

  const handleTitleKeyPress = async (e) => {
    if (e.key === 'Enter') {
    // Update the category title on Enter key press
      // You may want to add logic to save the edited title to the backend here
      // For now, we'll update it locally in the state
      dispatch(updateTitle(categoryId));
      setIsEditing(false);
      // dispatch boolean
      // dispatch newName
    }
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

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
      if (key === 'Due_Date' && value === "") {
        // get the specific task 
        for (const task of categoryTasks) {
          if (task._id === taskData._id) {    
            taskData[key] = task.Due_Date;
          }
        }
      } else {
        taskData[key] = value;
      }
    });
    console.log("EDITED TASK DATA",taskData);
    const obj = {categoryId, taskData};
    dispatch(editTask(obj));
    handleCloseDetailsModal();
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const taskData = {};
    formData.forEach((value, key) => {
      taskData[key] = value;
    });

    // Send the taskData to the backend:
    const newTask = await api.createTask(taskData);

    if (newTask) {
      const obj = {categoryId, newTask};
      dispatch(addNewTask(obj));
      handleCloseModal();
    }
  };

  const handleTaskRemove = async (taskData) => {
    const removedTask = await api.removeTask({_id: taskData});
    if (removedTask){
      const obj = {categoryId, id: taskData};
      dispatch(removeTask(obj));
      handleCloseModal();
    }
  };
  
  // const handleTaskEdit = async (taskData) => {
  //   const edittedTask = await api.editTask({Task_Name: taskData});
  //   if (edittedTask){
  //     // editTask(categoryId, edittedTask);
  //   }
  // };
  const handleCloseDetailsModal = () => {
    setSelectedTask(null);
  };

  return (
    <div>
      {/* UPDATE TITLE HERE */}
      {isEditing ? (
        <input
          type="text"
          defaultValue={title}
          onChange={handleTitleChange}
          onKeyPress={handleTitleKeyPress}
          onBlur={() => setIsEditing(false)}
          className="category-inputTitle center-title-vertically"
        />
      ) : (
        <div className='center-title-vertically'>
          <div className="category-title" onClick={handleTitleClick}>{category.name}
            <div className='category-title-length' >{category.items.length}</div>
          </div>
        </div> 
      )}
      
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



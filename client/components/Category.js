import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';
import TaskModal from './taskModal';
import TaskDetailsModal from './taskDetailsModal';
import { api } from '../utils/api';
import { useSelector, useDispatch } from 'react-redux';
import { setTask } from '../reducers/taskSlice';


export default function Category({ category, categoryId, addNewTask, removeTask, editTask }) {
  
  // access specific task state, in editing its property values
  const ntask = useSelector(state => state.tasks.task);
  const dispatch = useDispatch();


  const [isModalOpen, setModalOpen] = useState(false);    // Creating a new task (popup box)
  //const [selectedTask, setSelectedTask] = useState(null); // Identifies already created task and you click on the edit button -> edit details

  // TITLE EDITS =========================================
  const [isEditing, setIsEditing] = useState(false);              // Currently editing Title Name
  const [editedTitle, setEditedTitle] = useState(category.title); // Sets the Title Name 

 
  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleTitleKeyPress = async (e) => {
    if (e.key === 'Enter') {
    // Update the category title on Enter key press
      // You may want to add logic to save the edited title to the backend here
      // For now, we'll update it locally in the state
      setIsEditing(false);
      category.name = editedTitle;
    }
  };
  // TITLE EDITS =========================================


  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleTaskClick = (task) => {
    dispatch(setTask(task));
  };

  const formatDueDate = (date) => {
    if (!date) return '';

    const dueDate = new Date(date);
    const month = dueDate.getMonth() + 1;
    const day = dueDate.getDate();
    const year = dueDate.getFullYear();

    return `${month}-${day}-${year}`;

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
      addNewTask(categoryId, newTask);
      handleCloseModal();
    }
  };

  const handleTaskRemove = async (taskData) => {
    const removedTask = await api.removeTask({_id: taskData});
    if (removedTask){
      removeTask(categoryId, removedTask);
      handleCloseModal();
    }
  };
  
  const handleTaskEdit = async (taskData) => {
    const edittedTask = await api.editTask({Task_Name: taskData});
    if (edittedTask){
      editTask(categoryId, edittedTask);
    }

  };

  return (
    <div>
        {/* UPDATE TITLE HERE */}
      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={handleTitleChange}
          onKeyPress={handleTitleKeyPress}
          onBlur={() => setIsEditing(false)}
          className="category-inputTitle center-title-vertically"
        />
      ) : (
        <h2 className="category-title center-title-vertically" onClick={handleTitleClick}>{category.name}</h2>
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
              borderRadius: '10px',
              border: '1px solid #ccc', 
            }}
            className='columnShadow'
          >
            {category.items.map((task, index) => (
              <Task key={task._id} task={{...task, Due_Date: formatDueDate(task.Due_Date),}} index={index} onTaskClick={handleTaskClick} onTaskRemove={handleTaskRemove}/>
            ))}
            {provided.placeholder}
            <TaskDetailsModal
              isOpen={!!ntask}
              onClose={() => dispatch(setTask(null))}
              task={ntask}
              editTask={handleTaskEdit}
            />
          </div>
        )}
      </Droppable>
      <button onClick={handleOpenModal} className="add-task-button">+ Task</button>
      <TaskModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleFormSubmit} />
    </div>
  );
}

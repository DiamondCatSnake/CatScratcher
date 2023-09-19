import React from 'react';
//POPUP OF TASK ON CLICK OF TASK
export default function TaskDetailsModal({ isOpen, onClose, task, editTask }) {
  if (!isOpen) return null;
  console.log(task, "taskDetailsModal Task");
  console.log(task.Assignee, "taskDetailsModal ASSIGNEE");


  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='taskPopup'>
          <h2>{task.Task_Name}</h2>
          <button className='taskPopupButton'  onClick={() => editTask(task.Task_Name)}>Edit</button>
        </div>
        
        <div className='popContent'>
          <strong>Assignee: <span className='content'>{task.Assignee.join(', ')}</span></strong>
          <strong>Due Date: <span className='content'>{task.Due_Date}</span></strong>
          <strong>Priority: <span className='content'>{task.Priority}</span></strong> 
          <strong>Status: <span className='content'>{task.Status}</span></strong>
          <strong>Description: <span className='content'>{task.Description}</span></strong>
          <strong>Category: <span className='content'>{task.Category}</span></strong> 
        </div>
        <button className='popCloseButton' onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

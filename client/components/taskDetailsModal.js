import React, { useState } from 'react';
//POPUP OF TASK ON CLICK OF TASK
export default function TaskDetailsModal({ isOpen, onClose, task, onSubmit }) {
  if (!isOpen) return null;
  
  console.log(task, "taskDetailsModal Task");
  console.log(task.Assignee, "taskDetailsModal ASSIGNEE");
  console.log("TASK DUE DATE", task.Due_Date);

  return (
    <div className='modal' style={{ right: isOpen ? 'modal open ' : '-100%' }}>
      <div className='modal-content'>
        <div className='taskPopup'>
          <h2>{task.Task_Name}</h2>
          {/* <button className='taskPopupButton'  onClick={() => editTask(task.Task_Name)}>Edit</button> */}
        </div>

        <form className='createForm' onSubmit={onSubmit}>
          <div className='popContent'>
            <strong>Assignee: <input name='Assignee' type = 'text' placeholder = {task.Assignee} defaultValue={task.Assignee}/></strong> 
            <strong>Due Date: <input name='Due_Date' type = 'date' defaultValue = {task.Due_Date}/><span>{task.Due_Date}</span></strong>
            <strong>Priority: <input name='Priority' type = 'text' placeholder = {task.Priority} defaultValue={task.Priority}/></strong> 
            <strong>Status: <input name = 'Status' type = 'text' placeholder = {task.Status} defaultValue={task.Status}/></strong>
            <strong>Description: <input name = 'Description' type='text' placeholder = {task.Description} defaultValue={task.Description}/></strong>
            {/* <strong>Category: <input name = 'Category' type = 'text' placeholder = {task.Category} defaultValue={task.Category}/></strong>  */}
          </div>
          <button type='submit'>Update</button>
        </form>
        <button className='popCloseButton' onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

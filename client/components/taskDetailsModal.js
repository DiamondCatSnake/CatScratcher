import React, { useState } from 'react';
//POPUP OF TASK ON CLICK OF TASK
export default function TaskDetailsModal({ isOpen, onClose, task, onSubmit }) {
  if (!isOpen) return null;
  
  console.log(task, "taskDetailsModal Task");
  console.log(task.Assignee, "taskDetailsModal ASSIGNEE");
  console.log("TASK DUE DATE", task.Due_Date);

  return (
    // <div className={`modal ${isOpen ? 'open' : ''}`}>
    <div className="modal-wrap">
    <div className="modal">
      <div className='modal-content'>
        <div className='taskPopup'>
          <h2>{task.Task_Name}</h2>
          {/* <button className='taskPopupButton'  onClick={() => editTask(task.Task_Name)}>Edit</button> */}
        </div>

        <form className='createForm' onSubmit={onSubmit}>
            <strong>Assignee: <input  className ='inputform' name='Assignee' type = 'text' placeholder = {task.Assignee} defaultValue={task.Assignee}/></strong> <br/>
            <strong>Due Date: <input className="modal-date" name='Due_Date' type = 'date' defaultValue = {task.Due_Date}/><span>{task.Due_Date}</span></strong><br/>
            <strong>Priority: <input className ='inputform' name='Priority' type = 'text' placeholder = {task.Priority} defaultValue={task.Priority}/></strong>  <br/>
            <strong>Status: <input  className ='inputform' name = 'Status' type = 'text' placeholder = {task.Status} defaultValue={task.Status}/></strong><br/>
            <strong>Description: <input  className ='inputform' name = 'Description' type='text' placeholder = {task.Description} defaultValue={task.Description}/></strong><br/>
            {/* <strong>Category: <input name = 'Category' type = 'text' placeholder = {task.Category} defaultValue={task.Category}/></strong>  */}
        <button className='add-task-button' type='submit'>Update</button>
        </form>
        <button className='add-task-button' onClick={onClose}>Close</button>
      </div>
    </div>
    </div>
  );
}

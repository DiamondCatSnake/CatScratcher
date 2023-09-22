import React from 'react';
//FORM FOR SUBMITTING CREATING A TASK
export default function TaskModal({ isOpen, onClose, onSubmit }) {
  if (!isOpen) return null;

  const modalWrap = document.querySelector('.modal-wrap');
  const modalContent = document.querySelector('.modal-content');


  return (
    <div className="modal-wrap">
      <div className="modal">
        <div className='modal-content'>
          <h2>Create New Task</h2>
          <form className='createForm' onSubmit={onSubmit}>
            <input className ="modal-item" name='Task_Name' placeholder='Task Name' required />
            <input className ="modal-item" name='Assignee' placeholder='Assignee (comma-separated)' />
            <input className ="modal-item" name='Category' placeholder='Category' />
            <input className ="modal-item" name='Priority' placeholder='Priority' />
            <label>Due Date: </label>
            <input name='Due_Date' type='date' defaultValue = {new Date().toISOString().split('T')[0]}/>
            <input className ="modal-item" name='Status' placeholder='Status' />
            <textarea name='Description' placeholder='Description'></textarea>
            <button className='add-task-button' type='submit'
            >Create Task</button>
          </form>
          <button className='add-task-button' onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
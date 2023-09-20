import React from 'react';
//FORM FOR SUBMITTING CREATING A TASK
export default function TaskModal({ isOpen, onClose, onSubmit }) {
  if (!isOpen) return null;


  return (
    <div className='modal'>
      <div className='modal-content'>
        <h2>Create New Task</h2>
        <form className='createForm' onSubmit={onSubmit}>
          <div className='column'>
            <input name='Task_Name' placeholder='Task Name' required />
            <input name='Assignee' placeholder='Assignee (comma-separated)' />
            <input name='Category' placeholder='Category' />
            <input name='Priority' placeholder='Priority' />
          </div>
          <div className='column'>
            <label>Due Date: </label>
            <input name='Due_Date' type='date' defaultValue = {new Date().toISOString().split('T')[0]}/>
            <input name='Status' placeholder='Status' />
            <textarea name='Description' placeholder='Description'></textarea>
          </div>
          <button className='add-task-button' type='submit'
            style={{
              margin: '20px 0',
              height: '60px',
            }}
          >Create Task</button>
        </form>
        <button className='add-task-button' onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
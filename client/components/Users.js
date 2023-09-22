import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import UserItem from './UserItem';
import { api } from '../utils/api';

export default function User({ users, userId, addNewUser, removeUser }) {
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {};
    formData.forEach((value, key) => {
      userData[key] = value;
    });

    // Send the taskData to the backend:
    const newUser = await api.createUser(userData);

    if (newUser) {
      addNewUser(newUser);
    }
  };

  return (
    <div>
      <Droppable droppableId={String(userId)} key={userId}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              padding: 4,
              width: 250,
              minHeight: 500,
              background: snapshot.isDraggingOver ? '#cdb4db' : '#ffffff',
              backgroundColor: '#FFFFF',
              borderRadius: '10px',
              border: '1px solid #ccc',
               
            }}
            className='columnShadow'
          >
            {users.map((user, index) => (
              <UserItem key={user._id} user={user} index={index} removeUser={removeUser} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <form onSubmit={handleFormSubmit}>
        <label>NewUser: </label>
        <input className='userInput' name='name' placeholder='Username' required />
        <button className='add-task-button' type='submit'>+ Add</button>
      </form>
    </div>
  );
}

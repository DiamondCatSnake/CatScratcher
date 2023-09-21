import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { Routes, Route, Link } from 'react-router-dom';
import Category from './Category';
import Users from './Users';
import Login from './login';
import { useSelector, useDispatch } from 'react-redux';
import { addNewCategory, dragInCategory } from '../reducers/categorySlice';
import { api } from '../utils/api';



export default function HomeBoard() {
  const [users, setUsers] = useState([]);
  const ncategories = useSelector(state => state.categories.categories);
  const dispatch = useDispatch();

  console.log('Testing category', ncategories)

  // SOURCE & DESTINATION => Dragging between Categories 
  const onDragEnd = (result, users, setUsers) => {
    // Destructure the source and destination from the result object
    const { source, destination } = result;

    // Checks if item was dropped outside of the droppable environment
    if (!destination) return;

    // If the dragged item is from the 'usersCategory' droppable
    if (source.droppableId === 'usersCategory') {
      // Log the list of all users
      console.log('all users: ', users);

      // Create a copy of the users array
      const copiedUsers = [...users];
      console.log(copiedUsers);

      // Remove the user from the source index
      const [removed] = copiedUsers.splice(source.index, 1);

      // Insert the removed user at the destination index
      copiedUsers.splice(destination.index, 0, removed);

      // Update the state with the new users array
      setUsers(copiedUsers);

      // DISPATCH 
    } else {
      const obj = {source, dest: destination}
      dispatch(dragInCategory(obj));
    }
  }
    

  const addNewUser = (user) => {
    // console.log('New user:', user);
    // console.log('Adding to: ', users);
    setUsers((users) => {
      const updatedUsers = [...users, user];
      // console.log('New user list:', updatedUsers);
      return updatedUsers;
    });
  };
  
  const removeUser = (userId) => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.filter((user) => user._id !== userId);
      console.log('Users before:', prevUsers);
      console.log('Users after:', updatedUsers);
      return updatedUsers;
    });
  };


  const handleAddCategory = async () => {
    try {
      // Create new Category in MongoDB
      const response = await api.createCategory({ category: 'New Category' });
      // retrieve mongo's ID
      const mongoCategoryId = response._id
      // dispatch action with mongoDB's categoryID
      dispatch(addNewCategory(mongoCategoryId));
    } catch (error) {
      console.error('Error creating category:', error);
    }

  }

  return (
    <div className='app'>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, users, setUsers)}
      >
        <div className='categories-container'>
          <Users userId={'usersCategory'} users={users} addNewUser={addNewUser} removeUser={removeUser} />
          {Object.entries(ncategories).map(([id, category]) => (
            <Category key={id} categoryId={id} category={category}/>
          ))}
          <div className='add-category-container'>
            <button onClick={(handleAddCategory)} className="add-category-button"> + New Section</button>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}


  
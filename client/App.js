import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import Category from './components/Category';
import Users from './components/Users';

const initialCategories = {
  [uuidv4()]: {
    name: 'Todo',
    items: [],
  },
};
/*

*/
const onDragEnd = (result, categories, setCategories, users, setUsers) => {
  const { source, destination } = result;

  // Checks if item was dropped outside of the droppable environment
  if (!destination) return;

  if (source.droppableId === 'usersCategory') {
    console.log('all users: ', users);
    const copiedUsers = [...users];
    console.log(copiedUsers);
    const [removed] = copiedUsers.splice(source.index, 1);
    copiedUsers.splice(destination.index, 0, removed);

    setUsers(copiedUsers);
  } else if (source.droppableId === destination.droppableId) {
    // Reordering tasks within the same category
    const category = categories[source.droppableId];
    console.log(categories);
    console.log(categories[source.droppableId]);
    const copiedItems = [...category.items];
    console.log([...category.items]);
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);

    setCategories({
      ...categories,
      [source.droppableId]: {
        ...category,
        items: copiedItems,
      },
    });
  } else {
    // Moving tasks between different categories
    console.log(source);
    console.log(destination);
    const sourceCategory = categories[source.droppableId];
    const destCategory = categories[destination.droppableId];
    const sourceItems = [...sourceCategory.items];
    const destItems = [...destCategory.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

    setCategories({
      ...categories,
      [source.droppableId]: {
        ...sourceCategory,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destCategory,
        items: destItems,
      },
    });
  }
};

export default function App() {
  const [categories, setCategories] = useState(initialCategories);
  const [users, setUsers] = useState([]);

  const addNewCategory = () => {
    const newId = uuidv4();
    setCategories({
      ...categories,
      [newId]: {
        name: 'New Category',
        items: [],
      },
    });
  };

  const addNewTask = (categoryId, task) => {
    const category = categories[categoryId];
    const newItems = [...category.items, task];

    // Set updated item list, in the target category
    setCategories({
      ...categories,
      // Add to the list of items for that categor
      [categoryId]: {  
        ...category,
        items: newItems,
      },
    });
  };

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
  
  const removeTask = (categoryId, removeTask) => {
    const category = categories[categoryId];
    const newItems = [];

    setCategories({
      ...categories,
      [categoryId]: {
        ...category,
        items: newItems,
      },
    });
  };
  const editTask = (categoryId, edittedTask) => {
    const category = categories[categoryId];
    const newItems = edittedTask;

    setCategories({
      ...categories,
      [categoryId]: {
        ...category,
        items: newItems,
      },
    });
  };

  return (
    <div className='app'>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, categories, setCategories, users, setUsers)}
      >
        <div className='categories-container'>
          <Users userId={'usersCategory'} users={users} addNewUser={addNewUser} removeUser={removeUser} />
          {Object.entries(categories).map(([id, category]) => (
            <Category key={id} categoryId={id} category={category} addNewTask={addNewTask} removeTask={removeTask} editTask={editTask}/>
          ))}
          <div className='add-category-container'>
            <button onClick={addNewCategory} className="add-category-button"> + New Section</button>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}
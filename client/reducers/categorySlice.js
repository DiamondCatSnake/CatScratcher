import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  categories: {}, // {categoryid: {category, items: []}}
  task: {},
  isEditingTitle: false,
  titleChange: '',
  user_id: ''
};

// 1. when add a task
// 2. when we drag task onto another category
// 3. when we change order in task list

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {

    // finished backend
    addNewTask: (state, action) => {
      const category = state.categories[action.payload.categoryId];
      category.items.push(action.payload.newTask);
    },

    // finished backend
    dragInCategory: (state, action) => {
      const sourceCategory = state.categories[action.payload.source.droppableId];
      const destCategory = state.categories[action.payload.dest.droppableId];

      const [removed] = sourceCategory.items.splice(action.payload.source.index, 1);
      console.log("REMOVED element", [removed])
      destCategory.items.splice(action.payload.dest.index, 0, removed);
    },

    // finished backend
    removeTask: (state, action) => {
      const category = state.categories[action.payload.categoryId];
      const id = action.payload.id;

      for(let i = 0; i < category.items.length; i++) {
        if(category.items[i]._id === id) {
          category.items.splice(i,1);
        }
      }
    },

    // finished backend
    editTask: (state, action) => {
      //const obj = {categoryId, taskData};
      const category = state.categories[action.payload.categoryId];
      const newTaskId = action.payload.taskData._id;

      for (let i = 0; i < category.items.length; i++) {
        if(category.items[i]._id === newTaskId) {
          category.items[i] = action.payload.taskData;
        }
      }
    },

    // finished backend
    addNewCategory: (state, action) => {
      console.log("CLICKED");
      const newId = action.payload;
      console.log("SLICE'S CATEGORY ID", newId);
      state.categories = {
        ...state.categories,
        [newId]: {
          name: 'New Category',
          items: [],
        }
      };
    },
    
    // editing boolean
    setIsEditingTitle: (state, action) => {
      state.isEditingTitle = action.payload;
    },
    
    // live edit changes
    editTitle: (state, action) => {
      state.titleChange = action.payload;
    },

    // categoryId = action.payload
    // REFACTOR LATER
    updateTitle: (state, action) => {
      const categoryId = action.payload;
      const newTitle = state.titleChange;
      // Create a new state object to trigger Redux update
      return {
        ...state,
        categories: {
          ...state.categories,
          [categoryId]: {
            ...state.categories[categoryId],
            name: newTitle,
          },
        },
      };
    },

    setUserId: (state, action) => {
      state.user_id = action.payload;
    },

    setCategories: (state, action) => {
      const tasks = action.payload.tasks;
      const categoryNames = action.payload.names;
      const categories = {};
      for(const task of tasks) {
        const {Assignee, Description, Priority, Status, Task_Name, Due_Date, _id} = task;
        const taskObj = {Assignee, Description, Priority, Status, Task_Name, Due_Date, _id};
        const categoryName = categoryNames[task.Category];
        const categoryObj = {
          name: categoryName,
          items: [taskObj]
        }
        if(!categories[task.Category]) {
          categories[task.Category] = categoryObj;
        } else{
          categories[task.Category].items.push(taskObj);
        }
      }
      state.categories = categories;
    }
  }
});

export const { addNewTask, dragInCategory, removeTask, addNewCategory, editTask, editTitle, updateTitle, setIsEditingTitle, setUserId, setCategories } = categorySlice.actions;

export default categorySlice.reducer;
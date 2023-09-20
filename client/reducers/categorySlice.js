import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  categories: {}, // {categoryid: {category, items: []}}
  task: {}
};

// 1. when add a task
// 2. when we drag task onto another category
// 3. when we change order in task list


export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addNewTask: (state, action) => {
      const category = state.categories[action.payload.categoryId];
      category.items.push(action.payload.newTask);
    },
    

    dragInCategory: (state, action) => {
      const sourceCategory = state.categories[action.payload.source.droppableId];
      const destCategory = state.categories[action.payload.dest.droppableId];

      const [removed] = sourceCategory.items.splice(action.payload.source.index, 1);
      destCategory.items.splice(action.payload.dest.index, 0, removed);
    },


    removeTask: (state, action) => {
      const category = state.categories[action.payload.categoryId];
      const id = action.payload.id;

      for(let i = 0; i < category.items.length; i++) {
        if(category.items[i]._id === id) {
          category.items.splice(i,1);
        }
      }
    },
    
    editTask: (state, action) => {
      //const obj = {categoryId, taskData};
      const category = state.categories[action.payload.categoryId];
      const newTaskId = action.payload.taskData._id;

      for (let i = 0; i< category.items.length; i++) {
        if(category.items[i]._id === newTaskId) {
          category.items[i] = action.payload.taskData;
        }
      }
    },
    
    addNewCategory: (state, action) => {
      console.log("CLICKED");
      const newId = uuidv4();
      state.categories = {
        ...state.categories,
        [newId]: {
          name: 'New Category',
          items: [],
        }
      };
    },
  }
});
// dispatch -> reducerfunction(parameter)
// dispatch(setPlot('String'))

export const { addNewTask, dragInCategory, removeTask, addNewCategory, editTask } = categorySlice.actions;

export default categorySlice.reducer;
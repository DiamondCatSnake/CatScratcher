/**
 * ************************************
 *
 * @module  taskSlice.js
 * @author  Nathan Agbayani, Daniel Kim, Shi Kuang, Kelvin Mirhan, 
 * @date
 * @description 
 *
 * ************************************
 */

import { createSlice } from '@reduxjs/toolkit'
/*
const taskSchema = new Schema({
  Task_Name: {type: String, required: true},
  Assignee: {type: [String]},
  Due_Date: Date,
  Priority: String,
  Status: String,
  Description: String, 
  Category: String,
});
*/
const initialState = {
  task: {}
};
/*
  Task

*/
export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTask: (state, action) => {
      state.task = action.payload;
    },
  }
});

export const { setTask } = taskSlice.actions;

export default taskSlice.reducer;


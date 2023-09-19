import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './reducers/taskSlice';

// we are adding composeWithDevTools here to get easy access to the Redux dev tools
export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  }
});
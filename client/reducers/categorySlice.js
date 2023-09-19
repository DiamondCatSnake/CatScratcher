import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categories: {}
};

// when we change order in task list
// when we drag task onto another category


export const categorySlice = createSlice({
  name: 'searches',
  initialState,
  reducers: {
    setPlot: (state, action) => {

    }
  }
});
// dispatch -> reducerfunction(parameter)
// dispatch(setPlot('String'))

export const { setPlot } = categorySlice.actions;

export default categorySlice.reducer;
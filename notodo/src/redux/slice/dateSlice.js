import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: '',
  list: []
};

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload
    }
  }
})

export const { setDate } = dateSlice.actions;

export default dateSlice.reducer;
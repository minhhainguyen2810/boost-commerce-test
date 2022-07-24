import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface CounterState {
  searchValue?: string;
  data?: any[];
}

const initialState: CounterState = {
  data: [],
};

export const getApi = createAsyncThunk("home/getSharedVideos", async () => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts`
  );
  return response.data;
});

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    changeSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },

    resetStore: () => initialState,
  },
  extraReducers: (builder) => {
    // authenticate
    builder.addCase(getApi.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const { changeSearchValue, resetStore } = homeSlice.actions;

export default homeSlice.reducer;

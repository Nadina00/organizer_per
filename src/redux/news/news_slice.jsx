import { createSlice } from "@reduxjs/toolkit";
import newsOperations from "./news-operations";


const initialState = {
 news: [],
  isLoggind: false,
  isLoader: true,
 
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(
      newsOperations.newsList.pending,
      (state) => {
        state.isLoader = true;
      }
    );
    builder.addCase(
      newsOperations.newsList.fulfilled,
      (state, action) => {
        console.log(action)
        state.news = action.payload;
        state.isLoggind = false
      }
    );
    
  },
});
export default newsSlice.reducer;
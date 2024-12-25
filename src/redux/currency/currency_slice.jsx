import { createSlice } from "@reduxjs/toolkit";
import currencyOperations from "./currency-operations";


const initialState = {
 currency: [],
  isLoggind: false,
  isLoader: true,
 
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(
      currencyOperations.currencyList.pending,
      (state) => {
        state.isLoader = true;
      }
    );
    builder.addCase(
      currencyOperations.currencyList.fulfilled,
      (state, action) => {
        state.currency = action.payload;
        state.isLoggind = false
      }
    );
    
  },
});
export default currencySlice.reducer;
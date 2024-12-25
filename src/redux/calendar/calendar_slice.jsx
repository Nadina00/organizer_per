import { createSlice } from "@reduxjs/toolkit";
import calendarOperations from "./calendar-operations";

const initialState = {
  events: [],
  isLoggind: false,
  isLoader: true,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(calendarOperations.eventsAdd.pending, (state) => {
      state.isLoader = true;
    });
    builder.addCase(calendarOperations.eventsAdd.fulfilled, (state, action) => {
      console.log(action.payload.result);
      state.events.push(action.payload.result);
      state.isLoggind = false;
    });
    builder.addCase(calendarOperations.eventsAdd.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(calendarOperations.eventsList.pending, (state) => {
      state.isLoader = true;
    });
    builder.addCase(
      calendarOperations.eventsList.fulfilled,
      (state, action) => {
        console.log(action);
        state.events = action.payload;
        state.isLoggind = false;
      }
    );
    builder.addCase(calendarOperations.eventsList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(calendarOperations.eventsDel.pending, (state) => {
      state.isLoader = true;
    });
    builder.addCase(calendarOperations.eventsDel.fulfilled, (state, action) => {
     
      state.events = state.events.filter(({ _id }) => _id !== action.payload._id);

      state.isLoggind = false;
    });
    builder.addCase(calendarOperations.eventsDel.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});
export default calendarSlice.reducer;

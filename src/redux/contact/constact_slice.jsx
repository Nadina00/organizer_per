import { createSlice } from "@reduxjs/toolkit";
import contactsOperations from "./contact-operations";

const initialState = {
  contacts: [],
  isLoggind: false,
  isLoader: true,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(contactsOperations.contactsAdd.pending, (state) => {
      state.isLoader = true;
    });
    builder.addCase(
      contactsOperations.contactsAdd.fulfilled,
      (state, action) => {
        state.contacts.push(action.payload);
        state.isLoggind = false;
      }
    );
    builder.addCase(
      contactsOperations.contactsAdd.rejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
    builder.addCase(contactsOperations.contactsList.pending, (state) => {
      state.isLoader = true;
    });
    builder.addCase(
      contactsOperations.contactsList.fulfilled,
      (state, action) => {
        console.log(action);
        state.contacts = action.payload;
        state.isLoggind = false;
      }
    );
    builder.addCase(
      contactsOperations.contactsList.rejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
    builder.addCase(contactsOperations.contactsDel.pending, (state) => {
      state.isLoader = true;
    });
    builder.addCase(
      contactsOperations.contactsDel.fulfilled,
      (state, action) => {
        console.log(action.payload)
        state.contacts = state.contacts.filter(
          ({ id }) => id !== action.payload._id
        );

        state.isLoggind = false;
      }
    );
    builder.addCase(
      contactsOperations.contactsDel.rejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
  },
});
export default contactsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import userOperations from "./user-operations";

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLogging: false,
  isRefreshingUser: false,
  isLoader: true,
  error: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(userOperations.register.pending, (state) => {
      state.isLoader = true;
    });
    builder.addCase(userOperations.register.fulfilled, (state, action) => {
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
      state.isLoader = false;
      state.error = false;
      state.isLogging = true;
    });
    builder.addCase(userOperations.register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Unexpected error";
    });
    builder.addCase(userOperations.logIn.pending, (state) => {
      state.isLoader = true;
    });
    builder.addCase(userOperations.logIn.fulfilled, (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;
      state.isLoader = false;
      state.error = false;
      state.isLogging = true;
    });
    builder.addCase(userOperations.logIn.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(userOperations.fetchCurrentUser.pending, (state) => {
      state.isRefreshingUser = true;
      state.isLoader = true;
    });
    builder.addCase(
      userOperations.fetchCurrentUser.fulfilled,
      (state, action) => {
        console.log(action.payload)
        state.user = action.payload;
        state.isLogging = true;
        state.isRefreshingUser = false;
        state.isLoader = false;
      }
    );
    builder.addCase(userOperations.fetchCurrentUser.rejected, (state) => {
      state.isRefreshingUser = false;
      state.error = true;
    });
      builder.addCase(userOperations.logOut.fulfilled, (state) => {
      console.log("Before logout:", state);
      state.user = { name: null, email: null };
      state.token = null;
      state.isLogging = false;
      console.log("After logout:", state);
    });
    builder.addCase(userOperations.logOut.rejected, (state) => {
      state.error = true;
      state.isLoader = false;
    });
  },
});
export default userSlice.reducer;

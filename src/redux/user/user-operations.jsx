import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://organize-noda-pers.onrender.com";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};
console.log(token);

const register = createAsyncThunk(
  "auth/register",
  async (credential, thunkAPI) => {
    try {
      const { data } = await axios.post("https://organize-noda-pers.onrender.com/register", credential);
      token.set(data.user.token);
      console.log(data);
      return { data };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data?.message || "Register failed");
    }
  }
);
const logIn = createAsyncThunk("auth/login", async (credential, thunkAPI) => {
  try {
    const { data } = await axios.post("https://organize-noda-pers.onrender.com/login", credential);
    console.log(data.user);

    token.set(data.user.token);
    return data.user;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.message || "Login failed");
  }
});

const logOut = createAsyncThunk("auth/logOut", async (credentials) => {
  try {
    const { data } = await axios.post("https://organize-noda-pers.onrender.com/logOut", credentials);
    token.unset();
    return data;
  } catch (error) {
    console.log(error);
  }
});

const fetchCurrentUser = createAsyncThunk(
  "auth/current",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();

    const persistedToken = state.user.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue();
    }
    token.set(persistedToken);
    try {
      const { data } = await axios.get("https://organize-noda-pers.onrender.com/current");
      console.log(data.user);
      return data.user;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const userOperations = {
  fetchCurrentUser,
  register,
  logIn,
  logOut,
};

export default userOperations;

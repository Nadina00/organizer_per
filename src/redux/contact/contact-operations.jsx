import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://organize-noda-pers.onrender.com";

const contactsList = createAsyncThunk("contacts/contactsList", async () => {
  try {
    const data = await axios.get("https://organize-noda-pers.onrender.com/contact");
    return data.data.result;
  } catch (error) {
    console.error(error);
  }
});

const contactsAdd = createAsyncThunk(
  "contacts/contactsAdd",
  async (credential, thunkAPI) => {
    try {
      const { data } = await axios.post("https://organize-noda-pers.onrender.com/contact", credential);

      return data.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response?.data?.message || "Failed to add contact");
      }
    
  }
);
const contactsDel = createAsyncThunk("contacts/contactsDel", async (id, thunkAPI) => {
  try {
    const { data } = await axios.delete(`https://organize-noda-pers.onrender.com/contact/${id}`);
    return data.result;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data?.message || "Failed to delete contact");
  }
});

const contactsOperations = {
  contactsDel,
  contactsAdd,
  contactsList,
};

export default contactsOperations;

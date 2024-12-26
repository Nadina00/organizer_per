import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://organize-noda-pers.onrender.com";

const eventsList = createAsyncThunk("calendar/eventsList", async () => {
  try {
    const data = await axios.get("https://organize-noda-pers.onrender.com/event")
   
    return data.data.result
    ;
  } catch (error) {
    console.error(error);
  }
})

const eventsAdd = createAsyncThunk("calendar/eventsAdd", async (credential) => {
  try {
    const token = localStorage.getItem('persist:auth');
    console.log(token)
    const serializedEvent = {
      ...credential,
      start: credential.start.toISOString(), // Перетворення в рядок ISO
      end: credential.end.toISOString(),
    };
    const { data } = await axios.post("https://organize-noda-pers.onrender.com/event", serializedEvent ,{
      headers: { Authorization: `Bearer ${token}` }});
    
    return data;
  } catch (error) {
    console.error(error);
  }
});
const eventsDel = createAsyncThunk("calendar/eventsDel", async (id) => {
  
  try {
    const { data } = await axios.delete(`https://organize-noda-pers.onrender.com/event/${id}`);
    
    return data.result;
  } catch (error) {
    console.error(error);
  }
});

const calendarOperations = {
  eventsDel,
  eventsAdd,
  eventsList
};

export default calendarOperations;

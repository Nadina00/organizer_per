import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "http://localhost:5000";

const eventsList = createAsyncThunk("calendar/eventsList", async () => {
  try {
    const data = await axios.get("/event")
   
    return data.data.result
    ;
  } catch (error) {
    console.error(error);
  }
})

const eventsAdd = createAsyncThunk("calendar/eventsAdd", async (credential) => {
  try {
    const serializedEvent = {
      ...credential,
      start: credential.start.toISOString(), // Перетворення в рядок ISO
      end: credential.end.toISOString(),
    };
    const { data } = await axios.post("/event", serializedEvent);
    
    return data;
  } catch (error) {
    console.error(error);
  }
});
const eventsDel = createAsyncThunk("calendar/eventsDel", async (id) => {
  
  try {
    const { data } = await axios.delete(`/event/${id}`);
   
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

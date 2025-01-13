import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const newsList = createAsyncThunk("news/newsList", async () => {
  try {
    const { data } = await axios.get(
      "https://content.guardianapis.com/search?api-key=eb246130-cc93-4683-b111-c5979b780e81"
    );

    return data.response.results;
  } catch (error) {
    console.error(error);
  }
});

const newsOperations = {
  newsList,
};

export default newsOperations;

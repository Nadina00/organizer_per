import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const newsList = createAsyncThunk("news/newsList", async () => {
  try {
    const { data } = await axios.get(
      "https://content.guardianapis.com/search?api-key=194e26b0-d364-4440-a834-2da0ad6ff9a0"
    );
    console.log(data.response.results);

    return data.response.results;
  } catch (error) {
    console.error(error);
  }
});

const newsOperations = {
  newsList,
};

export default newsOperations;

import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const weatherList = createAsyncThunk("weather/weatherList", async (credential) => {
  try {
    const { data } = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=43e8d5472d3b43bba53145945231106&q=${credential}&lang=en`
    );

    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
});

const getWeatherCity = createAsyncThunk(
  "weather/getWeatherCity",
  async (credential) => {
    try {
      const { data } = await axios.get(
        `https://api.weatherapi.com/v1/search.json?key=43e8d5472d3b43bba53145945231106&q=${credential}&lang=en`
       ,
        credential
      );
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

const weatherOperations = {
  weatherList,
  getWeatherCity
};

export default weatherOperations;

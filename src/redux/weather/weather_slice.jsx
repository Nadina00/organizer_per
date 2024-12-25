import { createSlice } from "@reduxjs/toolkit";
import weatherOperations from "./weather-operations";


const initialState = {
 weather: [],
 city: {},
  isLoggind: false,
  isLoader: true,
 
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(
      weatherOperations.getWeatherCity.pending,
      (state) => {
        state.isLoader = true;
      }
    );
    builder.addCase(
      weatherOperations.getWeatherCity.fulfilled,
      (state, action) => {
        state.isLoader = false;
        state.city = action.payload
      }
    );
    builder.addCase(
      weatherOperations.weatherList.pending,
      (state) => {
        state.isLoader = true;
      }
    );
    builder.addCase(
      weatherOperations.weatherList.fulfilled,
      (state, action) => {
        state.weather = action.payload;
        state.isLoader = false
      }
    );
    
  },
});
export default weatherSlice.reducer;
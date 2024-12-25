import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";



// Асинхронное действие для получения данных о курсах валют
export const currencyList = createAsyncThunk(
  "currency/fetchRates",
  async (_, thunkAPI) => {
    try {
      const data = await axios.get("https://v6.exchangerate-api.com/v6/5481d082091d38b3b11aa21d/latest/UAH");
      console.log(data.data.conversion_rates
      )
      const USD = data.data.conversion_rates.USD;
      const EUR = data.data.conversion_rates.EUR;
      const currency = { USD, EUR };
      return currency;
    } catch (error) {
      if (error.response?.status === 429) {
        console.error("Too many requests. Please try again later.");
        return thunkAPI.rejectWithValue("Too many requests. Please wait.");
      }
      console.error("Error fetching currency rates:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch currency rates."
      );
    }
  }
);


const currencyOperations = {
  currencyList,
};

export default currencyOperations;

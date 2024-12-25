import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./news/news_slice";
import currencyReducer from "./currency/currency_slice";
import weatherReducer from "./weather/weather_slice";
import contactsReducer from "./contact/constact_slice";
import calendarReducer from "./calendar/calendar_slice";
import userReducer from "./user/user_slice";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

export const store = configureStore({
  reducer: {
    news: newsReducer,
    currency: currencyReducer,
    weather: weatherReducer,
    contacts: contactsReducer,
    calendar: calendarReducer,
    user: persistReducer(authPersistConfig, userReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ігноруємо екшени
        ignoredPaths: ["calendar.events"], // Ігноруємо перевірку для `calendar.events`
      },
    }),
});

export const persistor = persistStore(store);

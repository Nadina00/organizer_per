//import { useState } from 'react'
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./page/Home";
import { NewsPage } from "./page/News";
import { Weather } from "./page/Weather";
import { CurrentWeatherPage } from "./page/CurrentWeather";
import { ContactPage } from "./page/ContactPage";
import { LoginPage } from "./page/LoginPage";
import { RegisterPage } from "./page/RegisterPage";
import PublicRoute from "./components/routes/PublicRouter";
import PrivatRoute from "./components/routes/PrivatRouter";
import { useAuth } from "./components/hook/AuthHook";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import userOperations from "./redux/user/user-operations";
import { MyCalendarPage } from "./page/MyCalendarPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { isRefreshing } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userOperations.fetchCurrentUser());
  }, [dispatch]);

   return (
    <>
      {isRefreshing ? (
        <p>Wait</p>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/login"
            element={
              <PublicRoute redirectTo="/event" restricted component={LoginPage}>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute redirectTo="/login" restricted component={RegisterPage}>
      <RegisterPage />
    </PublicRoute>
            }
          />

          <Route
            path="/event"
            element={
              <PrivatRoute redirectTo="/login" component={MyCalendarPage}>
                <MyCalendarPage />
              </PrivatRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <PrivatRoute redirectTo="/login" component={ContactPage}>
                <ContactPage />
              </PrivatRoute>
            }
          />

          <Route path="/news" element={<NewsPage />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/current/:cityLoc" element={<CurrentWeatherPage />} />
        </Routes>
        
      )}
      <ToastContainer 
       position="top-right"
       autoClose={3000} // Тривалість у мс
       hideProgressBar={false}
       newestOnTop={false}
       closeOnClick
       rtl={false}
       pauseOnFocusLoss
       draggable
       pauseOnHover/>
    </>
  );
}

export default App;

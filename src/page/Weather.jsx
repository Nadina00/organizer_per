import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Header } from "../components/header/Header";
import { HeaderWeather } from "../components/weather/Header";

export const Weather = () => {
  return (
    <>
      <Header />
      <HeaderWeather />
      <Suspense fallback={<div>Loading page...</div>}>
            <Outlet />
          </Suspense>
      <Outlet/>
    </>
  );
};

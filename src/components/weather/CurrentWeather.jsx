import { useDispatch, useSelector } from "react-redux";
import { selectWeatherCurrent, selectWeatherIsLoader } from "../../redux/weather/weather-select";
import css from "./Weather.module.css"
import { Link } from "react-router-dom";
import weatherOperations from "../../redux/weather/weather-operations";

export const CurrentWeather = () => {
  const currentWeather = useSelector(selectWeatherCurrent);
  const isLoader = useSelector(selectWeatherIsLoader)
  const dispatch = useDispatch()

  const onClickBack = () =>{
    dispatch(weatherOperations.getWeatherCity())
  }

  if (!currentWeather && !isLoader) {
    return <p>No weather data available. Select a city or update your details.</p>;
  }

  return (
    <>
     {isLoader ? (<p>Loading...</p>) :
    (
        <div className={css.weather_container}>
        <h2>Current weather</h2>
        <p className={css.weather_temperature}>temp: {currentWeather.temp_c} °C</p>
        <p className={css.weather_condition}>{currentWeather.condition.text}</p>
        <img
          src={`${currentWeather.condition.icon}`}
          alt="Weather data by WeatherAPI.com"
          border="0"
          className={css.weather_icon}
        ></img>
      </div>
    )}
    <Link to={"/weather"} onClick={onClickBack} className={css.city_list_link}>Back</Link>
    </>
   

  );
};

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import weatherOperations from "../../redux/weather/weather-operations";
import { selectCity } from "../../redux/weather/weather-select";
import { City } from "./City";
import css from "./Weather.module.css"

export const HeaderWeather = () => {
  const [city, setCity] = useState();
  const dispatch = useDispatch();
  const cityLocation = useSelector(selectCity);

  const onChangeValue = (e) => {
    e.preventDefault();
    const { value } = e.currentTarget;
    setCity(value);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    dispatch(weatherOperations.getWeatherCity(city));
  };

  return (
    <div className={css.city_container}>
      <form className={css.city_form} onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="Enter city"
          name="city"
          onChange={onChangeValue}
          value={city}
          required
        />
        <button type="submit">Choose</button>
      </form>
      <ul className={css.city_list}>
        {!cityLocation.length && <p className={css.city_message}>Enter the city name to search...</p>}
        {cityLocation.length ? (
          cityLocation.map((city) => (
            <li key={city.id} className={css.city_list_item}>
              <City city={city} />
            </li>
          ))
        ) : (
          <p className={css.city_message}>City not found!</p>
        )}
      </ul>
    </div>
  );
}

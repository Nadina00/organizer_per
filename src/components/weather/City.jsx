import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import weatherOperations from "../../redux/weather/weather-operations";
import { selectWeatherIsLoader } from "../../redux/weather/weather-select";
import PropTypes from "prop-types";
import css from "./Weather.module.css"

export const City = ({ city }) => {

  const dispatch = useDispatch();
  const cityLon = city.lon;
  const cityLat = city.lat;
  const cityLoc = `${cityLat},${cityLon}`
  const isLoader = useSelector(selectWeatherIsLoader)

  const onClick = () => {
    dispatch(weatherOperations.weatherList(cityLoc));
  };

  return (
    <div className={css.city_list_container}>
      <Link onClick={onClick} to ={`/current/${cityLoc}`} className={css.city_list_link}>
        {" "}
        {city.name}, {city.region}, {city.country}
      </Link>
      {isLoader && <p>Loading Data...</p>} 
    </div>
  );
};

City.propTypes = {
    city: PropTypes.shape({
      name: PropTypes.string.isRequired,
      region: PropTypes.string,
      country: PropTypes.string.isRequired,
      lon: PropTypes.number.isRequired,
      lat: PropTypes.number.isRequired,
    }).isRequired,
  };

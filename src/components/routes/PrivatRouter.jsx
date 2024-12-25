
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { Navigate } from "react-router-dom";


export default function PrivatRoute({ children, redirectTo = "/login" }) {
  const isLoggedIn = useSelector((state) => !!state.user.token); // Перевірка токена

  console.log("Is user logged in:", isLoggedIn);

  return isLoggedIn ? children : <Navigate to={redirectTo} />;
}


PrivatRoute.propTypes = {
  redirectTo: PropTypes.string,
  children: PropTypes.elementType,
};

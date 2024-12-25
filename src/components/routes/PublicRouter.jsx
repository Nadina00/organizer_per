//import { Home } from "../../page/Home";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hook/AuthHook";
import PropTypes from "prop-types";

export default function PublicRoute({
    restricted = false,
    redirectTo = "/",
    component: Component,
  }) {
    const { isLogging } = useAuth();
  
    const shouldRedirect = isLogging && restricted;
  
    return shouldRedirect ? <Navigate to={redirectTo} /> : <Component />;
  }

PublicRoute.propTypes = {
  restricted: PropTypes.bool,
  redirectTo: PropTypes.string,
  component: PropTypes.elementType,
};

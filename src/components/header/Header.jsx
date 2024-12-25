import { Link } from "react-router-dom";
import css from "./Header.module.css";
import { Currency } from "../currency/Currency";
import { useDispatch } from "react-redux";
import userOperations from "../../redux/user/user-operations";
import { useAuth } from "../hook/AuthHook";

export const Header = () => {
  const day = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dispatch = useDispatch();
  const { user } = useAuth();
  console.log(user.name);

  const onClick = () => {
    dispatch(userOperations.logOut());
  };

  return (
    <header className={css.header}>
      <div className={css.header_container}>
        <Link className={css.header_title} to={"/event"}>
          My organizer, {user.name}
        </Link>
        <span className={css.header_date}>{day}</span>
        <nav className={css.header_nav}>
          <ul>
            <Link to={"/news"} className={css.link}>
              News
            </Link>
            <Link to={"/weather"} className={css.link}>
              Weather
            </Link>
            <Link to={"/contact"} className={css.link}>
              Contact
            </Link>
          </ul>
        </nav>
        <button className={css.logout_button} onClick={onClick}>
          Exit
        </button>
        <Currency />
      </div>
    </header>
  );
};

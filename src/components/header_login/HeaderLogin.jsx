import { Link } from "react-router-dom";
import css from "./Header.module.css";
import { Currency } from "../currency/Currency";

export const HeaderLogin = () => {
  const day = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className={css.header}>
      <div className={css.header_container}>
        <div>
        <h1 className={css.header_title}>My Organizer</h1>
        <span className={css.header_date}>{day}</span>
        </div>
        
        <Currency />
        <nav className={css.header_nav}>
          <ul>
            <Link to={"/news"} className={css.link}>News</Link>
            <Link to={"/weather"} className={css.link}>Weather</Link>
          </ul>
        </nav>

        

        <div className={css.authButtons}>
          <Link to="/login">
            <button className={`${css.button} ${css.loginButton}`}>Login</button>
          </Link>
          <Link to="/register">
            <button className={`${css.button} ${css.registerButton}`}>Register</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

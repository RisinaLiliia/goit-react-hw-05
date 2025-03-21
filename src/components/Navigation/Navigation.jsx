import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

const getLinkStyles = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Navigation = () => {
  return (
    <nav className={css.nav}>
      <NavLink to="/" className={getLinkStyles}>
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) => (isActive ? css.active : "")}
      >
        Movie
      </NavLink>
    </nav>
  );
};

export default Navigation;

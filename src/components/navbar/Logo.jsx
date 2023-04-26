import classes from "./Logo.module.css";

import logoImage from "../../assets/images/brain.png";

import { useNavigate } from "react-router-dom";
import RouteNames from "../../router/RouteNames";

function Logo({ redirectHome, redirectNotes }) {
  const navigate = useNavigate();

  function clickHandler() {
    if (redirectHome) {
      navigate(RouteNames.HOME);
    }

    if (redirectNotes) {
      navigate(RouteNames.NOTES)
    }
  }

  return (
    <div
      className={classes.logo}
      style={{ cursor: "pointer" }}
      onClick={clickHandler}
    >
      <img className={classes.image} src={logoImage} />
      <div className={classes.text}>HYPER FOCUS</div>
    </div>
  );
}

export default Logo;

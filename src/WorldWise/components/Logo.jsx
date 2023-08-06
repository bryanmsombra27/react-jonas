import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return <Link to="/app">
    <img src="/img-worldWise/logo.png" alt="WorldWise logo" className={styles.logo} />
  </Link>;
}

export default Logo;


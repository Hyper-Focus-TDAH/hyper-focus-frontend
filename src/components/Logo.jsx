import styles from './Logo.module.css';

import logoImage from '../assets/images/brain.png';

import { useNavigate } from 'react-router-dom';
import RouteNames from '../router/RouteNames';

function Logo({ redirect, hideText, size = '40px' }) {
  const navigate = useNavigate();

  function clickHandler() {
    if (redirect) {
      navigate(RouteNames.ROOT);
    }
  }

  return (
    <div
      className={styles.logo}
      style={{ cursor: 'pointer' }}
      onClick={clickHandler}
    >
      <img style={{ height: size }} src={logoImage} />
      {!hideText && <div className={styles.text}>HYPER FOCUS</div>}
    </div>
  );
}

export default Logo;

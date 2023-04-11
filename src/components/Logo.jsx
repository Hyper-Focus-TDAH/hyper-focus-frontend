import classes from './Logo.module.css';

import logoImage from '../assets/images/brain.png'

function Logo () {
  return <div className={classes.logo}>
    <img className={classes.image} src={logoImage} />
    <div className={classes.text} >HYPER FOCUS</div>
  </div>
}

export default Logo;
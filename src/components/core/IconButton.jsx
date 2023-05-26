import classes from './IconButton.module.css';

import { forwardRef } from 'react';

const IconButton = forwardRef(({ icon, style, onClick }, ref) => (
  <button
    ref={ref}
    type="button"
    className={classes.button}
    style={style}
    onClick={onClick}
  >
    {icon}
  </button>
));

export default IconButton;

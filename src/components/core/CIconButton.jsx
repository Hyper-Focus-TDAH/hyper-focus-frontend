import classes from './CIconButton.module.css'

import { forwardRef } from "react";

const IconButton = forwardRef(({ icon, size, padding, onClick }, ref) => (
  <button
    ref={ref}
    type="button"
    className={classes.button}
    style={{
      fontSize: size,
      padding: padding,
    }}
    onClick={onClick}
  >
    {icon}
  </button>
));

export default IconButton;

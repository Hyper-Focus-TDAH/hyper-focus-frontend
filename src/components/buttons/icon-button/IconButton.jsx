import styles from './IconButton.module.css';

import { forwardRef } from 'react';

const IconButton = forwardRef(({ icon, style, onClick, className }, ref) => (
  <button
    ref={ref}
    type="button"
    className={`${styles.button} ${className}`}
    style={style}
    onClick={onClick}
  >
    {icon}
  </button>
));

export default IconButton;

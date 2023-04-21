import classes from './CColorPicker.module.css';

import { BsCheckLg } from 'react-icons/bs';

const colors = [
  '',
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'dark',
];

function CColorPicker({ onSelectColor, selectedColor }) {
  return (
    <div className="d-flex justify-content-around align-items-center">
      {colors.map((color) => (
        <div
          key={color}
          className={`bg-${color} ${classes.colorButton}`}
          onClick={() => {
            onSelectColor(color);
          }}
        >
          {selectedColor === color && <BsCheckLg style={{fontSize: '20px', color: color === 'dark' ? 'lightgrey' : 'black'}}/>}
        </div>
      ))}
    </div>
  );
}

export default CColorPicker;

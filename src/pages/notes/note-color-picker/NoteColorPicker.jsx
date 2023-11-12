import styles from './NoteColorPicker.module.css';

import { BsCheckLg } from 'react-icons/bs';

const colors = [
  '',
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  // 'dark',
];

function NoteColorPicker({ onSelectColor, selectedColor = '' }) {
  return (
    <div className="d-flex justify-content-around align-items-center flex-wrap">
      {colors.map((color) => (
        <div
          key={color}
          className={`bg-${color} ${styles.colorButton} m-1`}
          onClick={() => {
            onSelectColor(color);
          }}
        >
          {selectedColor === color && (
            <BsCheckLg
              style={{
                fontSize: '20px',
                color: color === 'dark' ? 'lightgrey' : 'black',
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default NoteColorPicker;

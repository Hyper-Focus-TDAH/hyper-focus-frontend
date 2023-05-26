import { useEffect, useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';
import classes from './Drawer.module.css';
import IconButton from './IconButton';

function Drawer({ items = [] }) {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
    setSelectedItem(location.pathname);
  }, [location]);

  return (
    <div
      className={`${classes.drawer} ${
        isOpened ? classes.opened : classes.closed
      }`}
    >
      <IconButton
        style={{ fontSize: '30px', padding: '10px' }}
        icon={isOpened ? <BsChevronLeft /> : <BsChevronRight />}
        onClick={() => setIsOpened(!isOpened)}
      />
      {...items.map((item) => (
        <div
          className="d-flex align-items-center pointer"
          onClick={item.onClick}
        >
          <IconButton
            style={{
              fontSize: '30px',
              padding: '10px',
            }}
            icon={item.id == selectedItem ? item.iconSelected : item.icon}
          />
          {isOpened && <span>{item.label}</span>}
        </div>
      ))}
    </div>
  );
}

export default Drawer;

import styles from './BottomBar.module.css';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { itensTest } from '../../mainLayoutConfig';
import BottomBarItem from './BottomBarItem';

function BottomBar() {
  const location = useLocation();

  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setSelectedItem(`/${location.pathname.split('/')[1]}`);
  }, [location]);

  function isItemSelected(item) {
    return item.includes(selectedItem);
  }

  return (
    <div className={styles.container}>
      {...itensTest.map((item) => (
        <BottomBarItem
          isSelected={isItemSelected(item.id)}
          icon={item.icon}
          label={item.label}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
}

export default BottomBar;

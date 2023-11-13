import styles from './BottomBar.module.css';

import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router-dom';
import OptionsButton from '../../../components/buttons/options-button/OptionsButton';
import {
  bottomBarItems,
  reducedBottomBarItems,
  smallMobileHiddenOptions,
} from '../mainLayoutConfig';
import BottomBarItem from './BottomBarItem';

function BottomBar() {
  const location = useLocation();

  const [selectedItem, setSelectedItem] = useState(null);
  const isSmallMobile = useMediaQuery({ query: `(max-width: 360px)` });

  useEffect(() => {
    setSelectedItem(`/${location.pathname.split('/')[1]}`);
  }, [location]);

  function isItemSelected(item) {
    return item.includes(selectedItem);
  }

  if (isSmallMobile) {
    return (
      <div className={styles.container}>
        {...reducedBottomBarItems.map((item) => (
          <BottomBarItem
            key={item.id}
            isSelected={isItemSelected(item.id)}
            icon={item.icon}
            label={item.label}
            onClick={item.onClick}
          />
        ))}
        <div className={styles['options-button']}>
          <OptionsButton
            key="options-button"
            options={smallMobileHiddenOptions}
            buttonStyle={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
    );
  }

  if (!isSmallMobile) {
    return (
      <div className={styles.container}>
        {...bottomBarItems.map((item) => (
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

  return (
    <div className={styles.container}>
      {isSmallMobile && (
        <div>
          {...reducedBottomBarItems.map((item) => (
            <BottomBarItem
              key={item.id}
              isSelected={isItemSelected(item.id)}
              icon={item.icon}
              label={item.label}
              onClick={item.onClick}
            />
          ))}
          <div className={styles['options-button']}>
            <OptionsButton
              key="options-button"
              options={smallMobileHiddenOptions}
              buttonStyle={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      )}
      {!isSmallMobile && (
        <div>
          {...bottomBarItems.map((item) => (
            <BottomBarItem
              isSelected={isItemSelected(item.id)}
              icon={item.icon}
              label={item.label}
              onClick={item.onClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BottomBar;

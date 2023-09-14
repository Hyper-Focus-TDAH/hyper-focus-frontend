import { useEffect, useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import Divider from '../../../components/Divider';
import Logo from '../../../components/Logo';
import IconButton from '../../../components/buttons/IconButton';
import {
  configurationsNavConfig,
  drawerItems,
  logoutNavConfig,
  profileNavConfig,
} from '../../mainLayoutConfig';
import styles from './MainDrawer.module.css';
import MainDrawerItem from './MainDrawerItem';

function MainDrawer() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpened, setIsOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setSelectedItem(`/${location.pathname.split('/')[1]}`);
  }, [location]);

  function isItemSelected(item) {
    return item.includes(selectedItem);
  }

  return (
    <div className={styles.drawerContainer}>
      <div
        className={`${styles.drawer} ${
          isOpened ? styles.opened : styles.closed
        }`}
      >
        <div>
          <div className={styles.header} onClick={() => setIsOpened(!isOpened)}>
            <Logo hideText={!isOpened} size="30px" />
            <IconButton
              style={{ fontSize: '30px', padding: isOpened ? '10px' : '0px' }}
              icon={isOpened ? <BsChevronLeft /> : <BsChevronRight />}
            />
          </div>
          <Divider style={{ marginTop: '8px' }} />
          <MainDrawerItem
            isSelected={isItemSelected(profileNavConfig.id)}
            icon={profileNavConfig.icon}
            isOpened={isOpened}
            label={profileNavConfig.label}
            onClick={profileNavConfig.onClick}
          />
        </div>
        <div>
          {...drawerItems.map((item) => (
            <MainDrawerItem
              isSelected={isItemSelected(item.id)}
              icon={item.icon}
              isOpened={isOpened}
              label={item.label}
              onClick={item.onClick}
            />
          ))}
        </div>
        <div>
          <MainDrawerItem
            isSelected={isItemSelected(configurationsNavConfig.id)}
            icon={configurationsNavConfig.icon}
            isOpened={isOpened}
            label={configurationsNavConfig.label}
            onClick={() => navigate(configurationsNavConfig.id)}
          />
          <Divider />
          <MainDrawerItem
            icon={logoutNavConfig.icon}
            isOpened={isOpened}
            label={logoutNavConfig.label}
            onClick={logoutNavConfig.onClick}
          />
        </div>
      </div>
    </div>
  );
}

export default MainDrawer;

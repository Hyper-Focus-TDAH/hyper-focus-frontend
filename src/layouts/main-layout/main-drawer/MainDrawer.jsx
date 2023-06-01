import { useEffect, useState } from 'react';
import {
  BsCheckCircle,
  BsCheckCircleFill,
  BsChevronLeft,
  BsChevronRight,
  BsGear,
  BsPerson,
  BsSticky,
  BsStickyFill,
} from 'react-icons/bs';
import { FaSignOutAlt } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import Divider from '../../../components/Divider';
import IconButton from '../../../components/IconButton';
import Logo from '../../../components/Logo';
import { t } from '../../../i18n/translate';
import RouteNames from '../../../router/RouteNames';
import { logout } from '../../../services/api/auth';
import styles from './MainDrawer.module.css';
import MainDrawerItem from './MainDrawerItem';

function MainDrawer() {
  const [isOpened, setIsOpened] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const drawerItems = [
    {
      id: RouteNames.NOTES,
      icon: <BsSticky />,
      iconSelected: <BsStickyFill />,
      label: t('NOTES'),
      onClick: () => {
        navigate(RouteNames.NOTES);
      },
    },
    {
      id: RouteNames.TASKS,
      icon: <BsCheckCircle />,
      iconSelected: <BsCheckCircleFill />,
      label: t('TASKS'),
      onClick: () => {
        navigate(RouteNames.TASKS);
      },
    },
  ];

  useEffect(() => {
    setSelectedItem(location.pathname);
  }, [location]);

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
            isSelected={RouteNames.PROFILE == selectedItem}
            icon={<BsPerson />}
            isOpened={isOpened}
            label={t('PROFILE')}
            onClick={() => navigate(RouteNames.PROFILE)}
          />
        </div>
        <div>
          {...drawerItems.map((item) => (
            <MainDrawerItem
              isSelected={item.id == selectedItem}
              icon={item.icon}
              isOpened={isOpened}
              label={item.label}
              onClick={item.onClick}
            />
          ))}
        </div>
        <div>
          <MainDrawerItem
            isSelected={RouteNames.CONFIG == selectedItem}
            icon={<BsGear />}
            isOpened={isOpened}
            label={t('CONFIGURATIONS')}
            onClick={() => navigate(RouteNames.CONFIG)}
          />
          <Divider />
          <MainDrawerItem
            icon={<FaSignOutAlt />}
            isOpened={isOpened}
            label={t('LOGOUT')}
            onClick={logout}
          />
        </div>
      </div>
    </div>
  );
}

export default MainDrawer;

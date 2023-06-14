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
import { useDispatch } from 'react-redux';
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
  const [isOpened, setIsOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

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
    setSelectedItem(`/${location.pathname.split('/')[1]}`);
  }, [location]);

  function isItemSelected(item) {
    return item.includes(selectedItem);
  }

  async function handleLogout() {
    navigate(RouteNames.LOGIN);
    await logout();
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
            isSelected={isItemSelected(RouteNames.PROFILE)}
            icon={<BsPerson />}
            isOpened={isOpened}
            label={t('PROFILE')}
            onClick={() => navigate(RouteNames.PROFILE)}
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
            isSelected={isItemSelected(RouteNames.CONFIG)}
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
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
}

export default MainDrawer;

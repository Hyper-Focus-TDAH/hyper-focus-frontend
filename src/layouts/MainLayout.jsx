import classes from './MainLayout.module.css';

import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Button, Container, Navbar } from 'react-bootstrap';

import { t } from '../i18n/translate';

import {
  BsCheckCircle,
  BsCheckCircleFill,
  BsGear,
  BsSticky,
  BsStickyFill,
} from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import Drawer from '../components/core/Drawer';
import IconButton from '../components/core/IconButton';
import Logo from '../components/navbar/Logo';
import RouteNames from '../router/RouteNames';
import { logout } from '../services/api/auth';
import { auxActions } from '../store/aux';
import notify from '../utils/notify';

function MainLayout() {
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.aux.isLoading);

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
    if (!isAuthenticated && !isLoading) {
      logout();
    }

    if (location.pathname === '/') {
      navigate(RouteNames.HOME);
    }
  }, [isAuthenticated]);

  async function handleLogoutClick() {
    try {
      dispatch(auxActions.setLoading(true));
      await logout();
      notify.success(t('NOTIFY.SUCCESS.LOGOUT'));
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(auxActions.setLoading(false));
    }
    navigate(RouteNames.LOGIN);
  }

  function config() {
    navigate(RouteNames.CONFIG);
  }

  return (
    <div className={classes.root}>
      <Navbar className={classes.navbar} bg="light" expand={false}>
        <Logo redirectNotes />
        <div className="d-flex">
          <IconButton
            style={{ fontSize: '26px', color: 'white' }}
            icon={<BsGear />}
            onClick={config}
          />
          <Button className="ms-2" onClick={handleLogoutClick}>
            {t('LOGOUT')}
          </Button>
        </div>
      </Navbar>
      <div className={classes.contentContainer}>
        <Drawer items={drawerItems} />
        <Container className={classes.content}>
          <Outlet />
        </Container>
      </div>
    </div>
  );
}

export default MainLayout;

import classes from './MainLayout.module.css';

import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Navbar, Container, Button } from 'react-bootstrap';

import { t } from '../i18n/translate';

import Logo from '../components/navbar/Logo';
import RouteNames from '../router/RouteNames';
import IconButton from '../components/core/IconButton';
import { BsGear } from 'react-icons/bs';
import { logout } from '../services/api/auth';
import { useSelector } from 'react-redux';

function MainLayout() {
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      logout();
    }

    if (location.pathname === '/') {
      navigate(RouteNames.HOME)
    }
  }, [isAuthenticated])

  async function handleLogoutClick() {
    await logout();
    navigate(RouteNames.LOGIN);
  }

  function config() {
    navigate(RouteNames.CONFIG)
  }

  return (
    <div className={classes.root}>
      <Navbar className={classes.navbar} bg="light">
        <Logo redirectNotes />
        <div className='d-flex'>
          <IconButton size='20px' icon={<BsGear />} onClick={config} />
          <Button className='ms-2' onClick={handleLogoutClick}>{t('LOGOUT')}</Button>
        </div>
      </Navbar>
      <Container className={classes.content}>
        <Outlet />
      </Container>
    </div>
  );
}

export default MainLayout;

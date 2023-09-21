import styles from './AuthLayout.module.css';

import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Button, Container, Navbar } from 'react-bootstrap';

import Logo from '../../components/logo/Logo';
import RouteNames from '../../router/RouteNames';

import { useSelector } from 'react-redux';
import { t } from '../../i18n/translate';

function AuthLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isAuthenticated && location.pathname === '/') {
      navigate(RouteNames.NOTES);
    }
  }, [isAuthenticated]);

  function switchNavLoginRegister() {
    location.pathname === RouteNames.LOGIN
      ? navigate(RouteNames.REGISTER)
      : navigate(RouteNames.LOGIN);
    setShow(!show);
  }

  return (
    <div className={styles.root}>
      <Navbar className={styles.navbar} bg="light">
        <Logo redirect />
        <Button onClick={switchNavLoginRegister}>
          {location.pathname === RouteNames.LOGIN ? t('REGISTER') : t('LOGIN')}
        </Button>
      </Navbar>
      <Container className={styles.content}>
        <Outlet />
      </Container>
    </div>
  );
}

export default AuthLayout;

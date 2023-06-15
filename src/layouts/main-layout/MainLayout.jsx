import styles from './MainLayout.module.css';

import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Container } from 'react-bootstrap';

import { useSelector } from 'react-redux';
import RouteNames from '../../router/RouteNames';
import MainDrawer from '../main-layout/main-drawer/MainDrawer';

function MainLayout() {
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.aux.isLoading);

  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate(RouteNames.ROOT);
    }

    if (location.pathname === '/') {
      navigate(RouteNames.HOME);
    }
  }, [isAuthenticated]);

  return (
    <div className={styles.root}>
      <MainDrawer />
      <div className={styles.content}>
        <Container>
          <Outlet />
        </Container>
      </div>
    </div>
  );
}

export default MainLayout;

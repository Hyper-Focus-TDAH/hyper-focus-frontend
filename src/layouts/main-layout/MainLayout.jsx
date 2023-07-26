import styles from './MainLayout.module.css';

import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import RouteNames from '../../router/RouteNames';
import BottomBar from '../main-layout/bottom-bar/BottomBar';
import MainDrawer from '../main-layout/main-drawer/MainDrawer';

function MainLayout() {
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.aux.isLoading);

  const location = useLocation();
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate(RouteNames.ROOT);
    }

    if (location.pathname === '/') {
      navigate(RouteNames.NOTES);
    }
  }, [isAuthenticated]);

  return (
    <div className={styles.root}>
      {!isMobile && <MainDrawer />}
      <div className={styles.content}>
        <Outlet />
      </div>
      {isMobile && <BottomBar />}
    </div>
  );
}

export default MainLayout;

import styles from './MainLayout.module.css';

import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Container } from 'react-bootstrap';

import { useSelector } from 'react-redux';
import MainDrawer from '../components/layout/main-drawer/MainDrawer';
import RouteNames from '../router/RouteNames';
import { logout } from '../services/api/auth';

function MainLayout() {
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.aux.isLoading);

  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      logout();
    }

    if (location.pathname === '/') {
      navigate(RouteNames.HOME);
    }
  }, [isAuthenticated]);

  // async function handleLogoutClick() {
  //   try {
  //     dispatch(auxActions.setLoading(true));
  //     await logout();
  //     notify.success(t('NOTIFY.SUCCESS.LOGOUT'));
  //   } catch (e) {
  //     console.error(e);
  //   } finally {
  //     dispatch(auxActions.setLoading(false));
  //   }
  //   navigate(RouteNames.LOGIN);
  // }

  function config() {
    navigate(RouteNames.CONFIG);
  }

  return (
    <div className={styles.root}>
      {/* <Navbar className={styles.navbar} bg="light" expand={false}>
        <Logo redirect />
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
      </Navbar> */}
      <div className={styles.contentContainer}>
        <MainDrawer />
        <Container className={styles.content}>
          <Outlet />
        </Container>
      </div>
    </div>
  );
}

export default MainLayout;

import styles from './AuthLayout.module.css';

import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Button, Form, Navbar } from 'react-bootstrap';

import Logo from '../../components/logo/Logo';
import RouteNames from '../../router/RouteNames';

import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { LOCALES, localesNames } from '../../i18n/locales';
import { t } from '../../i18n/translate';
import { intlActions } from '../../store/intl-store/intlStore';

function AuthLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const isSmallHeader = useMediaQuery({ query: `(max-width: 550px)` });

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const locale = useSelector((state) => state.intl.locale);

  useEffect(() => {
    if (isAuthenticated && location.pathname === '/') {
      navigate(RouteNames.NOTES);
    }
  }, [isAuthenticated]);

  function goToLoginPage() {
    navigate(RouteNames.LOGIN);
  }

  function goToRegisterPage() {
    navigate(RouteNames.REGISTER);
  }

  const localesKeys = Object.keys(localesNames);

  return (
    <div className={styles.root}>
      <Navbar className={styles.navbar} bg="light">
        <Logo redirect hideText={isSmallHeader} />
        <div className={styles.buttons}>
          <Form.Select
            placeholder={t('CHANGE_LANGUAGE')}
            className={styles['language-selector']}
            value={locale}
            onChange={(val) => {
              dispatch(intlActions.setLocale(val.target.value));
            }}
          >
            {localesKeys.map((localeKey) => (
              <option key={localeKey} value={LOCALES[localeKey].KEY}>
                {localesNames[localeKey]}
              </option>
            ))}
          </Form.Select>
          <Button onClick={goToLoginPage}>{t('LOGIN')}</Button>
          <Button onClick={goToRegisterPage}>{t('REGISTER')}</Button>
        </div>
      </Navbar>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;

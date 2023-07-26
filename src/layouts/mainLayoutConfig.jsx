import {
  BsCheckCircle,
  BsGear,
  BsPeople,
  BsPerson,
  BsSticky,
} from 'react-icons/bs';
import { FaSignOutAlt } from 'react-icons/fa';
import { t } from '../i18n/translate';
import router from '../router';
import RouteNames from '../router/RouteNames';
import { logout } from '../services/api/authApi';
import store from '../store';
import { auxActions } from '../store/auxStore';
import notify from '../utils/notify';

const notesNavConfig = {
  id: RouteNames.NOTES,
  icon: <BsSticky />,
  label: t('NOTES'),
  onClick: () => router.navigate(RouteNames.NOTES),
};

const tasksNavConfig = {
  id: RouteNames.TASKS,
  icon: <BsCheckCircle />,
  label: t('TASKS'),
  onClick: () => router.navigate(RouteNames.TASKS),
};

const profileNavConfig = {
  id: RouteNames.PROFILE,
  icon: <BsPerson />,
  label: t('PROFILE'),
  onClick: () => router.navigate(RouteNames.PROFILE),
};

const forumNavConfig = {
  id: RouteNames.FORUM,
  icon: <BsPeople />,
  label: t('FORUM'),
  onClick: () => router.navigate(RouteNames.FORUM),
};

const configurationsNavConfig = {
  id: RouteNames.CONFIG,
  icon: <BsGear />,
  label: t('CONFIGURATIONS'),
  onClick: () => router.navigate(RouteNames.CONFIG),
};

const logoutNavConfig = {
  id: 'LOGOUT',
  icon: <FaSignOutAlt />,
  label: t('LOGOUT'),
  onClick: handleLogout,
};

const itensTest = [
  notesNavConfig,
  tasksNavConfig,
  forumNavConfig,
  profileNavConfig,
  configurationsNavConfig,
  logoutNavConfig,
];

const drawerItems = [notesNavConfig, tasksNavConfig, forumNavConfig];

async function handleLogout() {
  try {
    store.dispatch(auxActions.setLoading(true));

    await logout();
    router.navigate(RouteNames.LOGIN);
    notify.success(t('NOTIFY.SUCCESS.LOGOUT'));
  } catch (e) {
    console.error(e);
  } finally {
    store.dispatch(auxActions.setLoading(false));
  }
}

export {
  configurationsNavConfig,
  drawerItems,
  itensTest,
  logoutNavConfig,
  notesNavConfig,
  profileNavConfig,
  tasksNavConfig,
};

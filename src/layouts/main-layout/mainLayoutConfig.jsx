import {
  BsCheckCircle,
  BsGear,
  BsPeople,
  BsPerson,
  BsReverseLayoutTextSidebarReverse,
  BsSticky,
} from 'react-icons/bs';
import { FaSignOutAlt } from 'react-icons/fa';
import { logout } from '../../api/authApi';
import { t } from '../../i18n/translate';
import router from '../../router';
import RouteNames from '../../router/RouteNames';
import store from '../../store';
import { auxActions } from '../../store/aux/auxStore';
import notify from '../../utils/notify';

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
  onClick: () =>
    router.navigate(`${RouteNames.PROFILE}/${store.getState().user.username}`),
};

const forumNavConfig = {
  id: RouteNames.FORUM_FEED,
  icon: <BsPeople />,
  label: t('FORUM'),
  onClick: () => router.navigate(RouteNames.FORUM_FEED),
};

const adhdTestNavConfig = {
  id: RouteNames.ADHD_TEST,
  icon: <BsReverseLayoutTextSidebarReverse />,
  label: t('ADHD_TEST.LABEL'),
  onClick: () => router.navigate(RouteNames.ADHD_TEST),
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
  adhdTestNavConfig,
  configurationsNavConfig,
  logoutNavConfig,
];

const drawerItems = [
  notesNavConfig,
  tasksNavConfig,
  forumNavConfig,
  adhdTestNavConfig,
];

async function handleLogout() {
  try {
    store.dispatch(auxActions.setLoading(true));

    await logout();
    notify.success(t('NOTIFY.SUCCESS.LOGOUT'));
    router.navigate(RouteNames.LOGIN);
  } catch (e) {
    console.error(e);
  } finally {
    store.dispatch(auxActions.setLoading(false));
  }
}

export {
  adhdTestNavConfig,
  configurationsNavConfig,
  drawerItems,
  itensTest,
  logoutNavConfig,
  notesNavConfig,
  profileNavConfig,
  tasksNavConfig,
};

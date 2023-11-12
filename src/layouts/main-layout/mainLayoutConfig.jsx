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
import { auxActions } from '../../store/aux-store/auxStore';
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

const bottomBarItems = [
  notesNavConfig,
  tasksNavConfig,
  forumNavConfig,
  profileNavConfig,
  adhdTestNavConfig,
  configurationsNavConfig,
  logoutNavConfig,
];

const reducedBottomBarItems = [
  notesNavConfig,
  tasksNavConfig,
  forumNavConfig,
  profileNavConfig,
];

const drawerItems = [
  notesNavConfig,
  tasksNavConfig,
  forumNavConfig,
  adhdTestNavConfig,
];

const smallMobileHiddenOptions = [
  {
    id: 'ADHD_TEST',
    content: t('ADHD_TEST.LABEL'),
    onClick: () => router.navigate(RouteNames.ADHD_TEST),
  },
  {
    id: 'CONFIGURATIONS',
    content: t('CONFIGURATIONS'),
    onClick: () => router.navigate(RouteNames.CONFIG),
  },
  {
    id: 'LOGOUT',
    content: t('LOGOUT'),
    onClick: handleLogout,
  },
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
  bottomBarItems,
  configurationsNavConfig,
  drawerItems,
  logoutNavConfig,
  notesNavConfig,
  profileNavConfig,
  reducedBottomBarItems,
  smallMobileHiddenOptions,
  tasksNavConfig,
};

import { createBrowserRouter } from 'react-router-dom';

import RouteNames from './RouteNames';

import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';
import Login, { action as loginAction } from '../pages/Login';
import NotFound from '../pages/NotFound';
import Notes, { loader as notesLoader } from '../pages/Notes';
import PasswordRecovery from '../pages/PasswordRecovery';
import Profile, { loader as profileLoader } from '../pages/Profile';
import Register, { action as registerAction } from '../pages/Register';
import SendEmail from '../pages/SendEmail';
import Config from '../pages/config/Config';
import Tasks, { loader as tasksLoader } from '../pages/tasks/Tasks';

import { t } from '../i18n/translate';
import { recoverPassword, recoverUsername } from '../services/api/mailer';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: RouteNames.LOGIN,
        element: <Login />,
        action: loginAction,
      },
      {
        path: RouteNames.REGISTER,
        element: <Register />,
        action: registerAction,
      },
      {
        path: RouteNames.PASSWORD_RECOVERY,
        element: <PasswordRecovery />,
      },
      {
        path: RouteNames.FORGOT_PASSWORD,
        element: (
          <SendEmail
            title={t('FORGOT_PASSWORD')}
            description={t('FORGOT_PASSWORD_DESCRIPTION')}
            request={recoverPassword}
          />
        ),
      },
      {
        path: RouteNames.FORGOT_USERNAME,
        element: (
          <SendEmail
            title={t('FORGOT_USERNAME')}
            description={t('FORGOT_USERNAME_DESCRIPTION')}
            request={recoverUsername}
          />
        ),
      },
    ],
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: RouteNames.NOTES,
        element: <Notes />,
        loader: notesLoader,
      },
      {
        path: RouteNames.TASKS,
        element: <Tasks />,
        loader: tasksLoader,
      },
      {
        path: RouteNames.PROFILE,
        element: <Profile />,
        loader: profileLoader,
      },
      {
        path: RouteNames.CONFIG,
        element: <Config />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;

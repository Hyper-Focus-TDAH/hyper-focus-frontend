import { createBrowserRouter } from 'react-router-dom';

import RouteNames from './RouteNames';

import LoginPage, { action as loginAction } from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import PasswordRecoveryPage from '../pages/PasswordRecoveryPage';
import RegisterPage, { action as registerAction } from '../pages/RegisterPage';
import SendEmailPage from '../pages/SendEmailPage';
import ConfigurationsPage from '../pages/configurations/ConfigurationsPage';
import NotesPage, { loader as notesLoader } from '../pages/notes/NotesPage';
import ProfilePage, {
  loader as profileLoader,
} from '../pages/profile/ProfilePage';
import TasksPage, { loader as tasksLoader } from '../pages/tasks/TasksPage';

import { recoverPassword, recoverUsername } from '../api/mailerApi';
import { t } from '../i18n/translate';
import AuthLayout from '../layouts/auth-layout/AuthLayout';
import MainLayout from '../layouts/main-layout/MainLayout';
import ForumFeedPage, {
  loader as forumFeedLoader,
} from '../pages/forum/ForumFeedPage';
import ForumHomePage, {
  loader as forumHomeLoader,
} from '../pages/forum/ForumHomePage';
import ForumNewPage from '../pages/forum/ForumNewPage';
import ForumCommunity, {
  loader as communityLoader,
} from '../pages/forum/community/ForumCommunity';
import PostPage, { loader as postLoader } from '../pages/forum/post/PostPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: RouteNames.LOGIN,
        element: <LoginPage />,
        action: loginAction,
      },
      {
        path: RouteNames.REGISTER,
        element: <RegisterPage />,
        action: registerAction,
      },
      {
        path: RouteNames.PASSWORD_RECOVERY,
        element: <PasswordRecoveryPage />,
      },
      {
        path: RouteNames.FORGOT_PASSWORD,
        element: (
          <SendEmailPage
            title={t('FORGOT_PASSWORD')}
            description={t('FORGOT_PASSWORD_DESCRIPTION')}
            request={recoverPassword}
          />
        ),
      },
      {
        path: RouteNames.FORGOT_USERNAME,
        element: (
          <SendEmailPage
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
        element: <NotesPage />,
        loader: notesLoader,
      },
      {
        path: RouteNames.TASKS,
        element: <TasksPage />,
        loader: tasksLoader,
      },
      {
        path: RouteNames.FORUM_HOME,
        element: <ForumHomePage />,
        loader: forumHomeLoader,
      },
      {
        path: RouteNames.FORUM_FEED,
        element: <ForumFeedPage />,
        loader: forumFeedLoader,
      },
      {
        path: RouteNames.FORUM_NEW,
        element: <ForumNewPage />,
      },
      {
        path: RouteNames.FORUM_COMMUNITY,
        element: <ForumCommunity />,
        loader: communityLoader,
      },
      {
        path: RouteNames.POST_ID,
        element: <PostPage />,
        loader: postLoader,
      },
      {
        path: RouteNames.PROFILE_USERNAME,
        element: <ProfilePage />,
        loader: profileLoader,
      },
      {
        path: RouteNames.CONFIG,
        element: <ConfigurationsPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;

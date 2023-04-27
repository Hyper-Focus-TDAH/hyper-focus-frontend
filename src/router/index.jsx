import { createBrowserRouter } from "react-router-dom";

import RouteNames from './RouteNames'

import AuthLayout from "../layouts/AuthLayout";
import Login, { action as loginAction } from '../pages/Login'
import Register, { action as registerAction } from '../pages/Register'
import NotFound from '../pages/NotFound'
import MainLayout from "../layouts/MainLayout";
import Notes, { loader as notesLoader } from "../pages/Notes"; 
import Config from '../pages/Config'
import PasswordRecovery from "../pages/PasswordRecovery";
import ForgotPassword from "../pages/ForgotPassword";
import ForgotUsername from "../pages/ForgotUsername";

const router = createBrowserRouter([
  {
    path: "/",
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
        element: <PasswordRecovery />
      },
      {
        path: RouteNames.FORGOT_PASSWORD,
        element: <ForgotPassword />
      },
      {
        path: RouteNames.FORGOT_USERNAME,
        element: <ForgotUsername />
      }
    ],
  },
  {
    path: '/',
    element: <MainLayout/>,
    children: [
      {
        path: RouteNames.NOTES,
        element: <Notes />,
        loader: notesLoader,
      },
      {
        path: RouteNames.CONFIG,
        element: <Config />,
      },
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

export default router;

import { createBrowserRouter } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import Login, { action as loginAction } from '../pages/Login'
import Register, { action as registerAction } from '../pages/Register'
import NotFound from '../pages/NotFound'
import MainLayout from "../layouts/MainLayout";
import Notes, { loader as notesLoader } from "../pages/Notes"; 
import Config from '../pages/Config'

import RouteNames from './RouteNames'

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
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

export default router;

import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Login from './pages/Login'
import Register from './pages/Register'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />
      }
    ],
  },
]);

export default router;

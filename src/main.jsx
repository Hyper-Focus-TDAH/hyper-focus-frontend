import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import { ContextWrapper } from "./components/wrapper";
import router from "./router";


ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextWrapper>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ContextWrapper>
);

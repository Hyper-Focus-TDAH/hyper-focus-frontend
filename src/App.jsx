import React from "react";

import { RouterProvider } from "react-router-dom";
import { ContextWrapper } from "./components/wrapper";
import router from "./router";

function App() {
  return (
    <ContextWrapper>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </ContextWrapper>
  );
}

export default App;

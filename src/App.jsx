import React from "react";
import { I18nProvider } from './i18n';
import { useSelector } from "react-redux";

import { RouterProvider } from "react-router-dom";
import router from "./router";

function App() {

  const selectedLocale = useSelector((state) => state.intl.locale);

  return (
    <I18nProvider locale={selectedLocale} >
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </I18nProvider>
  );
}

export default App;

import React from "react";
import { I18nProvider } from './i18n';
import { useSelector } from "react-redux";

import { RouterProvider } from "react-router-dom";
import router from "./router";
import LoadingOverlay from "./components/core/LoadingOverlay";

function App() {

  const selectedLocale = useSelector((state) => state.intl.locale);

  return (
    <I18nProvider locale={selectedLocale} >
      <React.StrictMode>
        <LoadingOverlay />
        <RouterProvider router={router} />
      </React.StrictMode>
    </I18nProvider>
  );
}

export default App;

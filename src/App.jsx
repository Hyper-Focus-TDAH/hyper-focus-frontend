import React from 'react';
import { useSelector } from 'react-redux';
import { I18nProvider } from './i18n';

import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import LoadingOverlay from './components/loading-overlay/LoadingOverlay';
import router from './router';

function App() {
  const selectedLocale = useSelector((state) => state.intl.locale);

  return (
    <I18nProvider locale={selectedLocale}>
      <React.StrictMode>
        <Toaster />
        <LoadingOverlay />
        <RouterProvider router={router} />
      </React.StrictMode>
    </I18nProvider>
  );
}

export default App;

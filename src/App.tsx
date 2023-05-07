import React from 'react';
import { I18nProvider } from './i18n';
import { useSelector } from 'react-redux';

import { RouterProvider } from 'react-router-dom';
import router from './router';
import LoadingOverlay from './components/core/LoadingOverlay';
import { Toaster } from 'react-hot-toast';
import { RootState } from './store';

function App() {
  const selectedLocale: string = useSelector((state: RootState) => state.intl.locale);

  return (
    <I18nProvider locale={selectedLocale}>
      <React.StrictMode>
        <Toaster/>
        <LoadingOverlay />
        <RouterProvider router={router} />
      </React.StrictMode>
    </I18nProvider>
  );
}

export default App;

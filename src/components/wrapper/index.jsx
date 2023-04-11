import {useState, createContext} from 'react';
import { I18nProvider, LOCALES } from '../../i18n';

const Context = createContext();

const Wrapper = (props) => {

  const [locale, setLocale] = useState(LOCALES.PORTUGUESE);

  return (
      <Context.Provider value = {{locale, setLocale}}>
        <I18nProvider locale={locale}>
          {props.children}
        </I18nProvider>
      </Context.Provider>
  );
}

export {Wrapper, Context};
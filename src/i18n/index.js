import { default as I18nProvider } from './provider';

var i18nSingleton = (function () {
  var instance;

  function createInstance() {
    return I18nProvider;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

export { default as I18nProvider } from './provider';
export { LOCALES } from './locales';

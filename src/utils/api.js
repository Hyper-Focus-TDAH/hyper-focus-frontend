import axios from 'axios';
import { sleep } from '.';
import { t } from '../i18n/translate';
import router from '../router';
import RouteNames from '../router/RouteNames';
import store from '../store';
import notify from './notify';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_KEY,
});

api.interceptors.request.use(
  async (config) => {
    await sleep(100); // Needed because react-router-dom's action is called before redux-persist value is loaded on reload
    const state = store.getState();

    if (state.auth.isAuthenticated) {
      config.headers['Authorization'] = 'Bearer ' + state.auth.accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => {
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    console.error(error);
    if (error?.response?.status) {
      if ([403, 401].includes(error.response.status)) {
        const state = store.getState();
        if (state.auth.isAuthenticated) {
          notify.error(t('NOTIFY.ERROR.AUTH_EXPIRED'));
        } else {
          notify.error(t('NOTIFY.ERROR.AUTH_REQUIRED'));
        }
        router.navigate(RouteNames.LOGIN);
      }
    }

    if (error?.code === 'ERR_NETWORK') {
      notify.error(t('NOTIFY.ERROR.CONNECTION_FAILED'));
    }

    return Promise.reject(error.response);
  }
);

export default api;

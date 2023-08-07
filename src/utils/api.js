import axios from 'axios';
import { sleep } from '.';
import { t } from '../i18n/translate';
import router from '../router';
import RouteNames from '../router/RouteNames';
import store from '../store';
import { authActions } from '../store/authStore';
import notify from './notify';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_KEY,
});

api.interceptors.request.use(
  async (config) => {
    await sleep(100); // Needed because react-router-dom's action is called before redux-persist value is loaded on reload
    const state = store.getState();

    if (state.auth.isAuthenticated) {
      config.headers['Authorization'] = `Bearer ${state.auth.accessToken}`;
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
  async (error) => {
    if (error?.code === 'ERR_NETWORK') {
      notify.error(t('NOTIFY.ERROR.CONNECTION_FAILED'));
      return Promise.reject(error.response);
    }

    const status = error.response?.status;

    if ([403, 401].includes(status)) {
      const state = store.getState();

      if (state.auth.isAuthenticated) {
        try {
          const originalRequest = error.config;
          const response = await _refreshAccessToken();
          const accessToken = response.data.accessToken;

          store.dispatch(authActions.setTokens({ accessToken: accessToken }));
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          return axios(originalRequest);
        } catch (e) {
          notify.error(t('NOTIFY.ERROR.AUTH_EXPIRED'));
        }
      } else {
        notify.error(t('NOTIFY.ERROR.AUTH_REQUIRED'));
      }

      router.navigate(RouteNames.LOGIN);
    }

    return Promise.reject(error.response);
  }
);

async function _refreshAccessToken() {
  const state = store.getState();

  const anotherApi = axios.create({
    baseURL: import.meta.env.VITE_API_KEY,
    headers: {
      Authorization: 'Bearer ' + state.auth.refreshToken,
    },
  });

  return await anotherApi.post('api/v1/auth/refresh');
}

export default api;

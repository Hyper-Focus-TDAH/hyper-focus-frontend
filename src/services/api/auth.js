import api from '../../utils/api';
import store from '../../store';
import { userActions } from '../../store/user';
import { authActions } from '../../store/auth';

async function register(body) {
  const response = await api.post('/api/v1/auth/signup', {
    username: body.username,
    password: body.password,
    email: body.email,
  });

  updateStateData(response.data);

  return response;
}

async function login(body) {
  const response = await api.post('/api/v1/auth/login', {
    username: body.username,
    password: body.password,
  });

  updateStateData(response.data);

  return response;
}

async function logout() {
  const response = await api.post('/api/v1/auth/logout');

  store.dispatch(userActions.clearUser());

  store.dispatch(authActions.clearTokens());

  return response;
}

async function refresh() {}

function updateStateData(data) {
  const { id, email, username, accessToken, refreshToken } = data;

  store.dispatch(
    userActions.setUser({
      id,
      email,
      username,
    })
  );

  store.dispatch(
    authActions.setTokens({
      accessToken,
      refreshToken,
    })
  );
}

export { register, login, logout, refresh };

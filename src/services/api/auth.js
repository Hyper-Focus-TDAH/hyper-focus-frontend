import api from '../../utils/api';

async function register(body) {
  const response = await api.post('/api/v1/auth/signup', {
    username: body.username,
    password: body.password,
    email: body.email,
  });

  if (response?.data?.accessToken) {
    localStorage.setItem('jwt', response.data.accessToken);

    return response;
  }

  return null;
}

async function login(body) {
  const response = await api.post('/api/v1/auth/login', {
    username: body.username,
    password: body.password,
  });

  if (response?.data?.accessToken) {
    localStorage.setItem('jwt', response.data.accessToken);

    return response;
  }

  return null;
}

async function logout() {
  const response = await api.post('/api/v1/auth/logout');

  if (response?.data) {
    localStorage.clear();

    return response;
  }

  return null;
}

async function refresh() {}

export { register, login, logout, refresh };

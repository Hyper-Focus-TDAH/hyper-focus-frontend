import api from '../../utils/api';

async function getUserData() {
  const response = await api.get('api/v1/user');

  return response;
}

async function updateUserData(body) {
  const response = await api.patch(`api/v1/user`, body);
  return response;
}

async function updatePasswordByToken(body) {
  const response = await api.put('api/v1/user/password-recovery', body);

  return response;
}

export { getUserData, updatePasswordByToken, updateUserData };

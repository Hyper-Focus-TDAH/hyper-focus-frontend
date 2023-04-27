import api from '../../utils/api';

async function updatePasswordByToken(body) {
  const response = await api.put('api/v1/user/password-recovery', body);

  return response;
}

export { updatePasswordByToken };

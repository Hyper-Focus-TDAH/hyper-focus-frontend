import api from '../../utils/api';

async function recoverUsername(body) {
  const response = await api.post('api/v1/mailer/recover-username', body);

  return response;
}

async function recoverPassword(body) {
  const response = await api.post('api/v1/mailer/recover-password', body);

  return response;
}

export { recoverPassword, recoverUsername };

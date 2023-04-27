import api from "../../utils/api";

async function recoverUsername (body) {
  const response = await api.post('api/v1/mailer/username-recovery', body);

  return response;
}

async function recoverPassword (body) {
  const response = await api.post('api/v1/mailer/password-recovery', body);

  return response;
}

export {
  recoverUsername,
  recoverPassword,
}
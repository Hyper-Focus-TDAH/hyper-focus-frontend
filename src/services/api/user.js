import api from "../../utils/api";

async function updatePasswordByToken (body) { // body = { token, newPassword }
  const response = await api.post('api/v1/user/new-password', body);

  console.log('updatePasswordByToken', response);

  return response;
}

export {
  updatePasswordByToken,
}
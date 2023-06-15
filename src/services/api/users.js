import axios from 'axios';
import store from '../../store';
import api from '../../utils/api';

async function getUserData() {
  const response = await api.get('api/v1/users');

  return response;
}

async function updateUserData(body) {
  const response = await api.patch('api/v1/users', body);
  return response;
}

async function updatePasswordByToken(body) {
  const response = await api.put('api/v1/users/password-recovery', body);

  return response;
}

async function updateProfilePicture(body) {
  const state = store.getState();

  const pictureApi = axios.create({
    baseURL: import.meta.env.VITE_API_KEY,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + state.auth.accessToken,
    },
  });

  const response = await pictureApi.post(
    'api/v1/file-storage/profile-picture',
    body
  );

  return response;
}

export {
  getUserData,
  updatePasswordByToken,
  updateProfilePicture,
  updateUserData,
};

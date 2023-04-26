import axios from 'axios';
import router from '../../router';
import RouteNames from '../../router/RouteNames';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_KEY,
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:8081',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods':
      'GET, POST, PUT, DELETE, OPTIONS, HEAD, TRACE, CONNECT',
  },
});

api.interceptors.request.use(
  (config) => {
    if (config.url === 'LOGIN_ENDPOING' || config.url === 'REGISTER_ENDPOINT') {
      return config;
    }
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      config.headers['Authorization'] = 'Bearer ' + jwtToken;
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
        if (localStorage.getItem('jwt')) {
          console.log("O token de acesso expirou.")
          localStorage.removeItem('jwt');
        } else {
          console.log("É necessário estar logado para acessar essa funcionalidade")
        }
      }
    }


    if (error?.code === "ERR_NETWORK") {
      console.log("Falha ao conectar com o servidor, tente novamente mais tarde.")
    }

    router.navigate(RouteNames.LOGIN);
    return Promise.reject(error.response);
  }
);

export default api;

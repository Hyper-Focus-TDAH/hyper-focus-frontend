import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
//import RouteNames from '../../router/RouteNames';

//const navigate = useNavigate();

const api = axios.create({
  baseURL: import.meta.env.VITE_API_KEY,
});

/* api.interceptors.request.use(
  config => {
    if (config.url === "LOGIN_ENDPOING" || config.url === "REGISTER_ENDPOINT") {
      return config;
    }
    const jwtToken = localStorage.getItem("jwt");
    if (jwtToken) {
      config.headers["Authorization"] = 'Bearer ' + jwtToken;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  response => {
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    switch (error.response.status) {
      case 403:
        localStorage.removeItem('jwt')
        navigate(RouteNames.REGISTER)
        location.reload()
        break;
      default:
        break;
    }

    return Promise.reject(error.response);
  }
);
*/
export default api;

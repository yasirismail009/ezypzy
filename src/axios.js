import axios from 'axios';

axios.defaults.headers = {
    'Content-Type': 'application/json',
     Accept: 'application/json',
  };
const unauth = axios.create({
  baseURL: "https://api.mrezpz.ai"
  });
  unauth.interceptors.request.use(config => {
      config.headers['Content-Type'] = 'multipart/form-data';
      config.headers['Accept'] = 'application/json';
    return config;
  });

const authAxios = axios.create({
  baseURL: "https://api.mrezpz.ai",
  headers: {
    'Api-Token': 'your-api-token', // Replace with your actual API token
}
});
// Set up an interceptor to add the Authorization header to authAxios
authAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("access_token"); // Replace with your actual access token
  const cleanedToken = token.replace(/^"(.*)"$/, '$1');
  if (token) {
    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = 'application/json';
    config.headers['Api-Token'] = cleanedToken;
  }
  return config;
});
authAxios.interceptors.response.use(
  response => response,
  error => {
      if (error.response && error.response.status === 401) {
          // Handle 401 Unauthorized response, e.g., redirect to login page
          window.location.href = '/'; // Replace with your login page URL
      }
      return Promise.reject(error);
  }
);

export { unauth,authAxios};
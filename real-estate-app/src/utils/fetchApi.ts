import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://192.168.0.163:8000',
});

api.interceptors.request.use(
  async (config) => {
    const authToken = await AsyncStorage.getItem('token');
    if (authToken) {
      config.headers.Authorization = `${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      //   navigateToLoginPage();
      console.log('navigate to login page');
    }
  }
);
export default api;

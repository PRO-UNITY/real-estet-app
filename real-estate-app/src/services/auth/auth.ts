import axios from 'axios';
import api from 'src/utils/fetchApi';

export const login = async (data: any) => {
  const response = await axios.post(
    `http://192.168.0.163:8001/login-by-phone`,
    data
  );
  return response.data;
};

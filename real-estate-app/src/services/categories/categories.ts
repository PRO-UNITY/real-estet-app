import api from 'src/utils/fetchApi';

// get categories function
export const getCategories = async () => {
  const response = await api.get(`/categories/`);
  return response.data;
};

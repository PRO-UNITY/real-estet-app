import api from 'src/utils/fetchApi';

// get all houses
export const getHouses = async () => {
  const response = await api.get(`/estates/`);
  return response.data;
};

// get house by id
export const getHouseById = async (id: any) => {
  const response = await api.get(`/estates/${id}/`);
  return response.data;
};

// get houses by category filter and query
export const getHousesByCategoryFilter = async (category: any) => {
  const response = await api.get('/estates/?categoryID=' + category);
  return response.data;
};

// get houses by location filter
export const getHousesByLocationFilter = async (location: any) => {
  const response = await api.get('/estates/?location=' + location);
  return response.data;
};

// get houses by sqr filter
export const getHousesBySqrFilter = async (sqr: any) => {
  const response = await api.get('/estates/?square_footage=' + sqr);
  return response.data;
};

// contract house
export const contractHouse = async (data: any) => {
  const response = await api.post('/contract/', data);
  return response.data;
};

//calculate price
export const calculatePrice = async (data: any) => {
  const response = await api.post('/mortgage-caculator/', data);
  return response.data;
};

// get houses by price filter
export const getHousesByPriceFilter = async (price: any) => {
  const response = await api.get('/estates/?price=' + price);
  return response.data;
};

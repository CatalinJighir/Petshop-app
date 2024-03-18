import axios from "axios";

const apiUrl = "https://petstore.swagger.io/v2/pet";

export const findPets = async (status) => {
  const response = await axios.get(`${apiUrl}/findByStatus?status=${status}`);
  return response.data;
};

export const createPet = async (id, name, status) => {
  const response = await axios.post(apiUrl, { id, name, status });
  return response.data;
};

export const updatePet = async (id, name, status) => {
  const response = await axios.put(apiUrl, { id, name, status });
  return response.data;
};

export const findPet = async (id) => {
  const response = await axios.get(`${apiUrl}/${id}`);
  return response.data;
};

export const deletePet = async (id) => {
  const response = await axios.delete(`${apiUrl}/${id}`);
  return response.data;
};

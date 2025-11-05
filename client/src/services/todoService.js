import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/todos';

const getAll = async () => {
  const response = await axios.get(API_URL);
  return response.data;
}

const create = async (todo) => {
  const response = await axios.post(API_URL, todo);
  return response.data;
}

const remove = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
}

export default { getAll, create, remove };

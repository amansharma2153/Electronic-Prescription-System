import axios from 'axios';

export const checkInteraction = async (medicines) => {
  const response = await axios.post(
    'http://localhost:8000/check-interaction',
    { medicines }
  );
  return response.data;
};
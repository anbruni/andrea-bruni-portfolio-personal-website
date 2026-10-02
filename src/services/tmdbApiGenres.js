import axios from 'axios';

const apiService = axios.create({
  baseURL: '/api/tmdb',
});

export const fetchGenres = async () => {
  const response = await apiService.get('', {
    params: { type: 'genres' },
  });

  return response.data.genres ?? [];
};
import axios from 'axios';

const apiService = axios.create({
  baseURL: '/api/tmdb',
});

export const fetchMovies = async (filters = {}) => {
  const response = await apiService.get('', {
    params: { type: 'movies', ...filters },
  });

  return response.data.results ?? [];
};

export const fetchWatchProviders = async (movieId) => {
  const response = await apiService.get('', {
    params: { type: 'providers', movieId },
  });

  return response.data.results ?? {};
};
import axios from 'axios';

const apiService = axios.create({
  baseURL: '/api/tmdb',
});

export const fetchMovies = async (filters = {}) => {
  console.log(filters);
  const response = await apiService.get('', {
    params: { type: 'movies', ...filters },
  });

  console.log(response.data);
  return response.data ?? {};
};

export const fetchMovieById = async (movieId) => {
  const normalizedMovieId = String(movieId ?? '');
  if (!/^\d+$/.test(normalizedMovieId)) {
    throw new Error('A numeric movieId is required.');
  }

  const response = await apiService.get('', {
    params: { type: 'movie', movieId: normalizedMovieId },
  });

  return response.data ?? {};
};

export const fetchWatchProviders = async (movieId) => {
  const response = await apiService.get('', {
    params: { type: 'providers', movieId },
  });

  return response.data.results ?? {};
};
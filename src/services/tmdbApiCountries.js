import axios from 'axios';

const apiService = axios.create({
  baseURL: '/api/tmdb',
});

export const fetchCountries = async (language = 'en-US') => {
  const response = await apiService.get('', {
    params: {
      type: "regions",
      language: language,
    },
  });

  return response.data.results ?? [];
};

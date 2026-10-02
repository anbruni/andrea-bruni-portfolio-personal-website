import axios from 'axios';

export const fetchProviders = async (country = 'US') => {
  const response = await axios.get('/api/tmdb', {
    params: {
      type: 'providers',
      watch_region: country,
    },
  });

  return response.data.results ?? [];
};

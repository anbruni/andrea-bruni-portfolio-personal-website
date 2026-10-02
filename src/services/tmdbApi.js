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

// import axios from 'axios';

// const apiService = axios.create({
//   baseURL: 'https://api.themoviedb.org/3/',
// });

// const cleanParams = (params) =>
//   Object.fromEntries(Object.entries(params).filter(([, value]) => value !== '' && value != null));

// export const fetchMovies = async ({
//   mode = 'discover',
//   title = '',
//   year = '',
//   genre = '',
//   rating = '',
//   language = '',
//   provider = '',
//   country = '',
//   sortOption = '',
// } = {}) => {
//   const isTitleSearch = mode === 'title' && title.trim();
//   const endpoint = isTitleSearch ? '/search/movie' : '/discover/movie';

//   const params = cleanParams({
//     api_key: API_KEY,
//     ...(isTitleSearch
//       ? {
//           query: title.trim(),
//           primary_release_year: year,
//           language: language ? `${language}-US` : '',
//         }
//       : {
//           primary_release_year: year,
//           with_genres: genre,
//           'vote_average.gte': rating,
//           with_original_language: language,
//           with_watch_providers: provider,
//           watch_region: country,
//           sort_by:
//             sortOption === 'release_date'
//               ? 'primary_release_date.desc'
//               : sortOption === 'rating'
//                 ? 'vote_average.desc'
//                 : 'popularity.desc',
//         }),
//   });

//   try {
//     const response = await apiService.get(endpoint, { params });
//     return response.data.results ?? [];
//   } catch (error) {
//     console.error('Error fetching movies', error);
//     return [];
//   }
// };

// export const fetchWatchProviders = async (movieId) => {
//   try {
//     const response = await apiService.get(`/movie/${movieId}/watch/providers`, {
//       params: { api_key: API_KEY },
//     });
//     return response.data.results ?? {};
//   } catch (error) {
//     console.error('Error fetching watch providers', error);
//     return {};
//   }
// };
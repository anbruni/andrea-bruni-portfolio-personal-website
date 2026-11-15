const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const SORT_OPTIONS = {
  popularity: 'popularity.desc',
  release_date: 'primary_release_date.desc',
  rating: 'vote_average.desc',
};

const firstValue = (value) => (Array.isArray(value) ? value[0] : value) ?? '';

const cleanParams = (params) =>
  Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== '' && value != null)
  );

const buildMovieByIdParams = (movieId = '') => {
  if (!/^\d+$/.test(movieId)) {
    return {
      error: 'A numeric movieId is required.',
      status: 400,
    };
  }

  return {
    endpoint: `/movie/${movieId}`,
    params: {},
  };
};

const buildMovieParams = (query) => {
  const mode = firstValue(query.mode);
  const title = firstValue(query.title).trim();
  const isTitleSearch = mode === 'title' && title;

  return {
    endpoint: isTitleSearch ? '/search/movie' : '/discover/movie',
    params: cleanParams(
      isTitleSearch
        ? {
            query: title,
            primary_release_year: firstValue(query.year),
            language: firstValue(query.language),
            page: firstValue(query.page) || 1,
          }
        : {
            primary_release_year: firstValue(query.year),
            with_genres: firstValue(query.genre),
            'vote_average.gte': firstValue(query.rating),
            with_original_language: firstValue(query.language),
            with_watch_providers: firstValue(query.provider),
            watch_region: firstValue(query.country),
            sort_by:
              SORT_OPTIONS[firstValue(query.sortOption)] ??
              SORT_OPTIONS.popularity,
            page: firstValue(query.page) || 1,
          }
    ),
  };
};

export const resolveTmdbRequest = (query) => {
  const type = firstValue(query.type) || 'movies';

  if (type === 'movie') {
    return buildMovieByIdParams(firstValue(query.movieId));
  }

  if (type === 'movies') return buildMovieParams(query);

  if (type === 'genres') {
    return {
      endpoint: '/genre/movie/list',
      params: { language: 'en-US' },
    };
  }

  if (type === 'regions') {
    return {
      endpoint: '/watch/providers/regions',
      params: { language: firstValue(query.language) || 'en-US' },
    };
  }

  if (type === 'providers') {
    const movieId = firstValue(query.movieId);

    if (movieId) {
      if (!/^\d+$/.test(movieId)) {
        return {
          error: 'A numeric movieId is required.',
          status: 400,
        };
      }

      return {
        endpoint: `/movie/${movieId}/watch/providers`,
        params: {},
      };
    }

    return {
      endpoint: '/watch/providers/movie',
      params: {
        watch_region: firstValue(query.watch_region) || 'IT',
      },
    };
  }

  return { error: 'Unsupported request type.', status: 400 };
};

export const proxyTmdbRequest = async (query, apiKey) => {
  if (!apiKey) {
    return {
      status: 500,
      body: { error: 'TMDB API key is not configured.' },
    };
  }

  const resolved = resolveTmdbRequest(query);
  if (resolved.error) {
    return {
      status: resolved.status,
      body: { error: resolved.error },
    };
  }

  const tmdbUrl = new URL(`${TMDB_BASE_URL}${resolved.endpoint}`);
  tmdbUrl.search = new URLSearchParams({
    ...resolved.params,
    api_key: apiKey,
  }).toString();

  try {
    const tmdbResponse = await fetch(tmdbUrl);

    if (!tmdbResponse.ok) {
      return {
        status: tmdbResponse.status,
        body: { error: 'TMDB request failed.' },
      };
    }

    return {
      status: 200,
      body: await tmdbResponse.json(),
    };
  } catch (error) {
    console.error('TMDB proxy error:', error);
    return {
      status: 500,
      body: { error: 'Unable to reach TMDB.' },
    };
  }
};

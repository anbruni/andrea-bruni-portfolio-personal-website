import { createServer } from 'node:http';
import { existsSync, readFileSync } from 'node:fs';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const PORT = Number(process.env.PORT) || 3001;

const SORT_OPTIONS = {
  popularity: 'popularity.desc',
  release_date: 'primary_release_date.desc',
  rating: 'vote_average.desc',
};

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;

  for (const line of readFileSync(filePath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const separator = trimmed.indexOf('=');
    if (separator === -1) continue;

    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (process.env[key] == null) process.env[key] = value;
  }
}

loadEnvFile('.env.local');
loadEnvFile('.env');

const firstValue = (value) => (Array.isArray(value) ? value[0] : value) ?? '';

const cleanParams = (params) =>
  Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== '' && value != null)
  );

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
          }
        : {
            primary_release_year: firstValue(query.year),
            with_genres: firstValue(query.genre),
            'vote_average.gte': firstValue(query.rating),
            with_original_language: firstValue(query.language),
            with_watch_providers: firstValue(query.provider),
            watch_region: firstValue(query.country),
            sort_by: SORT_OPTIONS[firstValue(query.sortOption)] ?? SORT_OPTIONS.popularity,
          }
    ),
  };
};

const resolveRequest = (query) => {
  const type = firstValue(query.type) || 'movies';

  if (type === 'movies') return buildMovieParams(query);

  if (type === 'genres') {
    return {
      endpoint: '/genre/movie/list',
      params: { language: 'en-US' },
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

function sendJson(response, status, body, headers = {}) {
  response.writeHead(status, {
    'Content-Type': 'application/json',
    ...headers,
  });
  response.end(JSON.stringify(body));
}

const server = createServer(async (request, response) => {
  const requestUrl = new URL(request.url, `http://${request.headers.host}`);

  if (requestUrl.pathname !== '/api/tmdb') {
    return sendJson(response, 404, { error: 'Not found.' });
  }

  if (request.method !== 'GET') {
    return sendJson(response, 405, { error: 'Method not allowed.' }, { Allow: 'GET' });
  }

  const apiKey = process.env.TMDB_API_KEY || process.env.VITE_TMDB_API_KEY;

  if (!apiKey) {
    return sendJson(response, 500, { error: 'TMDB API key is not configured.' });
  }

  const resolved = resolveRequest(Object.fromEntries(requestUrl.searchParams));

  if (resolved.error) {
    return sendJson(response, resolved.status, { error: resolved.error });
  }

  const tmdbUrl = new URL(`${TMDB_BASE_URL}${resolved.endpoint}`);
  tmdbUrl.search = new URLSearchParams({ ...resolved.params, api_key: apiKey }).toString();

  try {
    const tmdbResponse = await fetch(tmdbUrl);

    if (!tmdbResponse.ok) {
      return sendJson(response, tmdbResponse.status, { error: 'TMDB request failed.' });
    }

    return sendJson(response, 200, await tmdbResponse.json());
  } catch (error) {
    console.error('TMDB proxy error:', error);
    return sendJson(response, 500, { error: 'Unable to reach TMDB.' });
  }
});

server.listen(PORT, () => {
  const keyStatus = process.env.TMDB_API_KEY || process.env.VITE_TMDB_API_KEY ? 'loaded' : 'missing';
  console.log(`TMDB proxy listening on http://localhost:${PORT}/api/tmdb`);
  console.log(`API key: ${keyStatus}`);
});
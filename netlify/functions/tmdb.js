import { env } from 'node:process';
import { proxyTmdbRequest } from '../../api/tmdbProxy.js';

export default async (request) => {
  if (request.method !== 'GET') {
    return Response.json(
      { error: 'Method not allowed.' },
      { status: 405, headers: { Allow: 'GET' } }
    );
  }

  const query = Object.fromEntries(new URL(request.url).searchParams);
  const apiKey = env.TMDB_API_KEY || env.VITE_TMDB_API_KEY;
  const result = await proxyTmdbRequest(query, apiKey);

  return Response.json(result.body, { status: result.status });
};

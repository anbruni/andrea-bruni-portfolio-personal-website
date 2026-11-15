import { createServer } from 'node:http';
import { existsSync, readFileSync } from 'node:fs';
import { proxyTmdbRequest } from './tmdbProxy.js';

const PORT = Number(process.env.PORT) || 3001;

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
  const result = await proxyTmdbRequest(
    Object.fromEntries(requestUrl.searchParams),
    apiKey
  );

  return sendJson(response, result.status, result.body);
});

server.listen(PORT, () => {
  const keyStatus = process.env.TMDB_API_KEY || process.env.VITE_TMDB_API_KEY ? 'loaded' : 'missing';
  console.log(`TMDB proxy listening on http://localhost:${PORT}/api/tmdb`);
  console.log(`API key: ${keyStatus}`);
});
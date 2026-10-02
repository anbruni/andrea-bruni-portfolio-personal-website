import { useEffect, useMemo, useState } from 'react';
import { fetchMovies, fetchWatchProviders } from '../services/tmdbApi';
import { getUserGeoData } from '../services/ipGeoLocation';
import FavouriteMovieCard from './FavouriteMovieCard';
import FormMoviesSearch from './FormMoviesSearch';
import Expander from './Expander';

const GEO_COUNTRY_KEY = 'user-country';

const Movies = () => {
  const [country, setCountry] = useState(
    () => localStorage.getItem(GEO_COUNTRY_KEY) || 'IT'
  );
  const [movies, setMovies] = useState([]);
  const [watchProviders, setWatchProviders] = useState({});
  const [search, setSearch] = useState({
    mode: 'discover',
    country: 'US',
    sortOption: 'popularity',
  });

  const providers = [
    ['Streaming', 'flatrate'],
    ['Rent', 'rent'],
    ['Buy', 'buy'],
  ];

  useEffect(() => {
    if (localStorage.getItem(GEO_COUNTRY_KEY)) return;

    const fetchCountry = async () => {
      try {
        const data = await getUserGeoData();
        const countryCode = data?.location?.country_code2?.toUpperCase();

        if (countryCode) {
          localStorage.setItem(GEO_COUNTRY_KEY, countryCode);
          setCountry(countryCode);
          setSearch((current) => ({ ...current, country: countryCode }));
        }
      } catch (error) {
        console.error('Unable to determine user country:', error);
      }
    };

    fetchCountry();
  }, []);

  useEffect(() => {
    const fetchMoviesData = async () => {
      const moviesData = await fetchMovies(search);
      setMovies(moviesData);
      setWatchProviders({});
    };

    fetchMoviesData();
  }, [search]);

  useEffect(() => {
    if (!movies.length) return;

    const fetchProviders = async () => {
      const providerEntries = await Promise.all(
        movies.map(async (movie) => [
          movie.id,
          await fetchWatchProviders(movie.id),
        ])
      );
      setWatchProviders(Object.fromEntries(providerEntries));
    };

    fetchProviders();
  }, [movies]);

  const sortedMovies = useMemo(() => {
    const result = [...movies];

    if (search.sortOption === 'release_date') {
      return result.sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date)
      );
    }
    if (search.sortOption === 'rating') {
      return result.sort((a, b) => b.vote_average - a.vote_average);
    }
    if (search.sortOption === 'popularity') {
      return result.sort((a, b) => b.popularity - a.popularity);
    }
    return result;
  }, [movies, search.sortOption]);

  const handleSearch = (filters) => {
    const selectedCountry = filters.country || country;
    setCountry(selectedCountry);
    setSearch(filters);
  };

  return (
    <div className="movies-list flex flex-col gap-12 items-center">
      <FormMoviesSearch onSearch={handleSearch} initialCountry={country} />
      <FavouriteMovieCard />
      <h1 className="heading-2">Movies</h1>

      <div className="flex flex-col gap-4 md:gap-8 max-w-5xl">
        {sortedMovies.map((movie) => {
          const providersByCountry =
            watchProviders[movie.id]?.[search.country || country] || {};

          return (
            <article
              key={movie.id}
              className="movie-container card-glow relative isolate w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-slate-300 shadow-xl"
            >
              <div className="movie-card flex flex-col gap-6 md:flex-row">
                {movie.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={`${movie.title} poster`}
                    className="h-auto max-h-[32rem] w-full object-cover md:w-64 md:rounded-s-2xl"
                  />
                )}
                <div className="movie-info p-6 text-slate-300">
                  <h2 className="mb-3 text-2xl font-bold">{movie.title}</h2>
                  <p>
                    <strong>Original title:</strong> {movie.original_title}
                  </p>
                  <p className="mt-3">
                    <strong>Overview:</strong>{' '}
                    {movie.overview || 'No overview available.'}
                  </p>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <p>
                      <strong>Release date:</strong>{' '}
                      {movie.release_date || 'Unknown'}
                    </p>
                    <p>
                      <strong>Language:</strong>{' '}
                      {movie.original_language?.toUpperCase()}
                    </p>
                    <p>
                      <strong>Rating:</strong> {movie.vote_average} / 10
                    </p>
                    <p>
                      <strong>Votes:</strong> {movie.vote_count}
                    </p>
                  </div>

                  <Expander
                    summary="Watch Providers"
                    providersByCountry={providersByCountry}
                  >
                    <div className="mt-6 inline-grid gap-5 sm:grid-cols-3 w-full">
                      {providers.map(
                        ([label, providerType]) =>
                          (providersByCountry[providerType] || []).length >
                            0 && (
                            <section key={providerType}>
                              <h3 className="mb-2 font-semibold">
                                {label} in {search.country || country}
                              </h3>
                              <div className="inline-flex min-h-6 gap-3">
                                {(providersByCountry[providerType] || []).map(
                                  (provider) => (
                                    <div
                                      key={provider.provider_id}
                                      className="relative group w-fit"
                                    >
                                      <img
                                        src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                                        alt={provider.provider_name}
                                        className="h-6 w-6 rounded-md object-contain"
                                      />
                                      <span
                                        role="tooltip"
                                        className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100"
                                      >
                                        {provider.provider_name}
                                      </span>
                                    </div>
                                  )
                                )}
                              </div>
                            </section>
                          )
                      )}
                    </div>
                  </Expander>
                  {/* {movie.backdrop_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                      alt={`${movie.title} backdrop`}
                      className="mt-6 w-full rounded-lg object-cover"
                    />
                  )} */}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Movies;

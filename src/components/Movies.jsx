import { useEffect, useMemo, useState, useRef } from 'react';
import { fetchMovies, fetchWatchProviders } from '../services/tmdbApi';
import { fetchCountries } from '../services/tmdbApiCountries';
import { getUserGeoData } from '../services/ipGeoLocation';
import FormMoviesSearch from './FormMoviesSearch';
import Expander from './Expander';
import ScrollPages from './ScrollPages';

const GEO_COUNTRY_KEY = 'user-country';
const TMDB_MAX_PAGES = 500;

const Movies = () => {
  const [selectedCountryCode, setSelectedCountryCode] = useState(
    () => localStorage.getItem(GEO_COUNTRY_KEY) || 'IT'
  );
  const [countries, setCountries] = useState([]);

  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [moviesError, setMoviesError] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [watchProviders, setWatchProviders] = useState({});
  const [search, setSearch] = useState({
    mode: 'discover',
    country: '',
    sortOption: '',
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
          setSelectedCountryCode(countryCode);
        }
      } catch (error) {
        console.error('Unable to determine user country:', error);
      }
    };

    fetchCountry();
  }, []);

  useEffect(() => {
    const loadCountries = async () => {
      const results = await fetchCountries();

      const countryOptions = results.map((country) => {
        return [String(country.iso_3166_1), country.english_name];
      });

      setCountries(countryOptions);
    };

    loadCountries();
  }, []);

  const effectiveCountryCode = search.country || selectedCountryCode;
  const selectedCountryName =
  countries.find((item) => item[0] === effectiveCountryCode)?.[1]
  ?? effectiveCountryCode;

  useEffect(() => {
    const fetchMoviesData = async () => {
      setMoviesError('');

      try {
        const moviesDataResponse = await fetchMovies({ ...search, page });
        setMovies(moviesDataResponse.results ?? []);
        setTotalPages(moviesDataResponse.total_pages ?? 0);
        setWatchProviders({});
      } catch (error) {
        console.error('Failed to fetch movies data:', error);
        setMoviesError('Unable to load movies. Please try again.');
        setMovies([]);
        setTotalPages(0);
        setWatchProviders({});
      }
    };

    fetchMoviesData();
  }, [search, page]);

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
    const selectedCountry = filters.country || selectedCountryCode;
    setSelectedCountryCode(selectedCountry);
    setPage(1);
    setSearch(filters);
  };
  const movieRef = useRef(null);

  return (
    <div className="movies-list flex flex-col items-center gap-12">
      <FormMoviesSearch onSearch={handleSearch} countryList={countries} initialCountry={selectedCountryCode} />
      <h1 ref={movieRef} className="heading-2">
        Movies
      </h1>

      {moviesError && (
        <p
          role="alert"
          className="w-full max-w-5xl rounded-xl border border-rose-400/30 bg-rose-950/60 px-5 py-4 text-rose-200"
        >
          {moviesError}
        </p>
      )}

      <div className="flex flex-col gap-4 md:gap-8 max-w-5xl">
        {sortedMovies.map((movie) => {
          const providersByCountry =
            watchProviders[movie.id]?.[search.country || selectedCountryCode] || {};

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
                                {label} in {selectedCountryName || search.country}
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
      {totalPages && (
        <ScrollPages totalPages={totalPages} maxPages={TMDB_MAX_PAGES} page={page} setPage={setPage} scrollTopRef={movieRef} />
      )}
    </div>
  );
};

export default Movies;

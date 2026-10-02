import { useState, useEffect } from 'react';
import SortMoviesFilter from './SortMoviesFilter';
import { fetchGenres } from '../services/tmdbApiGenres';
import { fetchProviders } from '../services/tmdbApiProviders';

const GENRES = await fetchGenres().then((genres) => genres.map((genre) => [String(genre.id), genre.name]));

const LANGUAGES = [
  ['US', 'English'],
  ['IT', 'Italian'],
  ['FR', 'French'],
  ['DE', 'German'],
  ['ES', 'Spanish'],
  ['JA', 'Japanese'],
  ['KO', 'Korean'],
];


const COUNTRIES = [
  ['IT', 'Italy'],
  ['GB', 'United Kingdom'],
  ['US', 'United States'],
  ['FR', 'France'],
  ['DE', 'Germany'],
  ['ES', 'Spain'],
];

// const PROVIDERS = await fetchProviders(initialCountry).then((results) => results.map((result) => [String(result.provider_id), result.provider_name]));

//and how do I get the country/initialCountry from Movies.jsx?


const inputClassName =
  'w-full rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none transition focus:border-french-blue-light focus:ring-2 focus:ring-french-blue-light/30';

const SelectField = ({ id, label, value, onChange, options, placeholder }) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className="text-sm font-medium text-slate-300">
      {label}
    </label>
    <select id={id} value={value} onChange={onChange} className={inputClassName}>
      <option value="">{placeholder}</option>
      {options.map(([optionValue, optionLabel]) => (
        <option key={optionValue} value={optionValue}>
          {optionLabel}
        </option>
      ))}
    </select>
  </div>
);

const FormMoviesSearch = ({ onSearch, initialCountry = 'US' }) => {
const [providers, setProviders] = useState([]);


  const [mode, setMode] = useState('title');
  const [filters, setFilters] = useState({
    title: '',
    genre: '',
    year: '',
    rating: '',
    language: '',
    provider: '',
    country: initialCountry,
    sortOption: '',
  });

  useEffect(() => {
    const loadProviders = async () => {
      const results = await fetchProviders(initialCountry);
      console.log(results);

      const providerOptions = results.map((provider) => [
        String(provider.provider_id),
        provider.provider_name,
      ]);

      setProviders(providerOptions);
    };

    loadProviders();
  }, [initialCountry]);

  const updateFilter = (field) => (event) => {
    setFilters((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch({ mode, ...filters });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-2xl border border-white/10 bg-slate-900/75 p-5 shadow-2xl backdrop-blur md:p-7"
    >
      <fieldset>
        <legend className="mb-4 text-xl font-semibold text-white">Find a movie</legend>
        <div className="mb-6 grid grid-cols-2 gap-2 rounded-xl bg-slate-950/60 p-1">
          {[
            ['title', 'Search by title'],
            ['discover', 'Discover movies'],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={mode === value}
              onClick={() => setMode(value)}
              className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
                mode === value
                  ? 'bg-french-blue text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {mode === 'title' ? (
          <div className="flex flex-col gap-2">
            <label htmlFor="movie-title" className="text-sm font-medium text-slate-300">
              Movie title
            </label>
            <input
              id="movie-title"
              type="search"
              value={filters.title}
              onChange={updateFilter('title')}
              placeholder="Harry Potter"
              className={inputClassName}
              autoComplete="off"
              required
            />
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <SelectField id="genre" label="Genre" value={filters.genre} onChange={updateFilter('genre')} options={GENRES} placeholder="Any genre" />
            <div className="flex flex-col gap-2">
              <label htmlFor="year" className="text-sm font-medium text-slate-300">Year</label>
              <input id="year" type="number" min="1878" max="2100" value={filters.year} onChange={updateFilter('year')} placeholder="2026" className={inputClassName} />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="rating" className="text-sm font-medium text-slate-300">Rating</label>
              <select id="rating" value={filters.rating} onChange={updateFilter('rating')} className={inputClassName}>
                <option value="">Any rating</option>
                {[6, 7, 8, 9].map((rating) => <option key={rating} value={rating}>{rating}+ </option>)}
              </select>
            </div>
            <SelectField id="language" label="Language" value={filters.language} onChange={updateFilter('language')} options={LANGUAGES} placeholder="Any language" />
            <SelectField id="provider" label="Streaming" value={filters.provider} onChange={updateFilter('provider')} options={providers} placeholder="Any service" />
            <SelectField id="country" label="Country" value={filters.country} onChange={updateFilter('country')} options={COUNTRIES} placeholder="Any country" />
          </div>
        )}
      </fieldset>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SortMoviesFilter onSort={(sortOption) => setFilters((current) => ({ ...current, sortOption }))} />
        <button type="submit" className="btn-primary w-full sm:w-40">Search</button>
      </div>
    </form>
  );
};

export default FormMoviesSearch;
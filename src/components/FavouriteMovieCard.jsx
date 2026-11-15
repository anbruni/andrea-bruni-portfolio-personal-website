import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Navigation, Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { fetchMovieById } from '../services/tmdbApi';

import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const reviewedMovies = [
  { id: 1003596, review: 'My review...' },
  { id: 1400837, review: 'My review...' },
  { id: 1423191, review: 'My review...' },
  { id: 1381071, review: 'My review...' }
];

const FavouriteMovieCard = ({ className = '' }) => {
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    let isCurrent = true;

    const fetchMoviesData = async () => {
      try {
        const moviesDataResponse = await Promise.all(
          reviewedMovies.map(async ({ id, review }) => {
            const movie = await fetchMovieById(id);
            return { ...movie, review };
          })
        );

        if (isCurrent) setWatchedMovies(moviesDataResponse);
      } catch (error) {
        console.error('Unable to load reviewed movies:', error);
        if (isCurrent) setLoadError('Unable to load your movie reviews right now.');
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    };

    fetchMoviesData();

    return () => {
      isCurrent = false;
    };
  }, []);

  const selectedMovie = watchedMovies.find(
    (movie) => movie.id === selectedMovieId
  );

  return (
    <div className={`mx-auto w-full max-w-2xl ${className}`}>
      <Swiper
        modules={[EffectCards, Navigation, Pagination]}
        effect="cards"
        grabCursor
        navigation
        pagination={{ clickable: true }}
        cardsEffect={{
          perSlideRotate: 8,
          perSlideOffset: 10,
        }}
        className="h-[28rem] w-full sm:h-[32rem]"
      >
        {watchedMovies.map((movie) => {
          const title = movie.title || movie.original_title;
          const imagePath = movie.backdrop_path || movie.poster_path;
          const isSelected = selectedMovieId === movie.id;

          return (
          <SwiperSlide
            key={movie.id}
            className="overflow-hidden rounded-[1.75rem] border border-white/15 bg-slate-900 shadow-2xl"
          >
            <button
              type="button"
              onClick={() =>
                setSelectedMovieId((currentId) =>
                  currentId === movie.id ? null : movie.id
                )
              }
              aria-expanded={isSelected}
              aria-controls={`movie-review-${movie.id}`}
              className="group relative flex h-full w-full cursor-pointer flex-col justify-end overflow-hidden rounded-[1.75rem] text-left text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-blue-300"
            >
              {imagePath && (
                <img
                  src={`https://image.tmdb.org/t/p/w1280${imagePath}`}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-slate-950/5 transition-colors duration-300 group-hover:from-slate-950/95" />
              <div className="relative z-10 w-full p-7 sm:p-9">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-blue-200">
                  Featured review
                </p>
                <h2 className="max-w-xl text-3xl font-bold leading-tight drop-shadow-lg sm:text-5xl">
                  {title}
                </h2>
                <div className="mt-4 flex items-center gap-3 text-sm text-slate-200">
                  {movie.release_date && (
                    <span>{movie.release_date.slice(0, 4)}</span>
                  )}
                  {movie.vote_average > 0 && (
                    <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1 backdrop-blur-sm">
                      Rating {movie.vote_average.toFixed(1)}
                    </span>
                  )}
                  <span className="ml-auto text-xs font-medium text-white/75">
                    {isSelected ? 'Hide review' : 'Read review'}
                  </span>
                </div>
              </div>
            </button>
          </SwiperSlide>
          );
        })}
      </Swiper>

      {isLoading && (
        <p className="mt-8 text-center text-sm text-slate-400" role="status">
          Loading your movie reviews...
        </p>
      )}
      {loadError && (
        <p className="mt-8 text-center text-sm text-rose-300" role="alert">
          {loadError}
        </p>
      )}
      {!isLoading && !loadError && watchedMovies.length === 0 && (
        <p className="mt-8 text-center text-sm text-slate-400">
          No reviewed movies yet.
        </p>
      )}

      {selectedMovie && (
        <article
          id={`movie-review-${selectedMovie.id}`}
          className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-black/20 backdrop-blur sm:p-8"
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-blue-300">
            My review
          </p>
          <h3 className="text-2xl font-bold text-white sm:text-3xl">
            {selectedMovie.title || selectedMovie.original_title}
          </h3>
          <p className="mt-5 whitespace-pre-line text-base leading-7 text-slate-300">
            {selectedMovie.review?.trim() || 'Review coming soon.'}
          </p>
        </article>
      )}
    </div>
  );
};

export default FavouriteMovieCard;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Movies from '../components/Movies';
import FavouriteMovieCard from '../components/FavouriteMovieCard';

function CinemaPage({ location }) {
  const isHome = location.pathname === '/';
  const [activeTab, setActiveTab] = useState('reviews');

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-start justify-start px-6 md:px-10 pb-24 pt-0 md:pt-10 md:pb-24 relative z-10">

      {isHome ? null : (
        <Link to="/" className="md:hidden btn-back mb-10">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      )}

      <h1 className="heading-1 mb-3">Cinema Area</h1>
      <p className="subtitle mb-12">
        Welcome to my personal cinema hub. Discover movies, find out which
        streaming services offer them in your country, and read my reviews.
      </p>

      <div className="cinema-panel w-full rounded-2xl bg-transparent">
        <div
          id="tab-selector"
          role="tablist"
          aria-label="Cinema sections"
          className="cinema-tablist flex items-end"
        >
          <button
            id="movies-tab"
            type="button"
            role="tab"
            aria-selected={activeTab === 'movies'}
            aria-controls="cinema-tabpanel"
            onClick={() => setActiveTab('movies')}
            className={`cinema-tab flex-1 px-4 py-4 text-sm font-semibold transition-colors sm:text-base ${
              activeTab === 'movies'
                ? 'cinema-tab-active cinema-tab-active-movies bg-french-blue text-white shadow-lg shadow-blue-950/30 hover:bg-french-blue-light'
                : 'rounded-t-2xl border-b border-blue-400/30 bg-blue-950/70 text-blue-200 hover:bg-blue-900/80 hover:text-white'
            }`}
          >
            Discover Movies
          </button>
          <button
            id="reviews-tab"
            type="button"
            role="tab"
            aria-selected={activeTab === 'reviews'}
            aria-controls="cinema-tabpanel"
            onClick={() => setActiveTab('reviews')}
            className={`cinema-tab flex-1 px-4 py-4 text-sm font-semibold transition-colors sm:text-base ${
              activeTab === 'reviews'
                ? 'cinema-tab-active cinema-tab-active-reviews bg-french-blue text-white shadow-lg shadow-blue-950/30 hover:bg-french-blue-light'
                : 'rounded-t-2xl border-b border-blue-400/30 bg-blue-950/70 text-blue-200 hover:bg-blue-900/80 hover:text-white'
            }`}
          >
            My Reviews
          </button>
        </div>

        <section
          id="cinema-tabpanel"
          role="tabpanel"
          aria-labelledby={activeTab === 'movies' ? 'movies-tab' : 'reviews-tab'}
          className="min-h-64 p-4 sm:p-6"
        >
          {activeTab === 'movies' ? (
            <Movies />
          ) : (
            <div className="flex min-h-64 flex-col items-center justify-center gap-5 text-center">
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                My Reviews
              </h2>
              <p className="mb-8 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg lg:text-xl">
                View my favourite movies of the month and my reviews here!
              </p>
              <FavouriteMovieCard />
            </div>
          )}
        </section>
      </div>

    </div>
  );
}

export default CinemaPage;
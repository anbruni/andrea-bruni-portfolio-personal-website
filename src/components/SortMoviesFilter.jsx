//Please help me to create a nice sort filter component for movies using Tailwind CSS. I want to be able to sort movies based on popularity, release date, rating. To be used inside FormMoviesSearch.jsx. It must be a nice menu that opens up and I can select the options
import { useState } from 'react';
const SortMoviesFilter = ({ onSort }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSort(option);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-xl border border-white/15 bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-french-blue-light hover:text-white"
      >
        Sort by: {selectedOption || 'Select'}
      </button>
      {isOpen && (
        <div className="absolute z-20 mt-2 min-w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
          <button
            type="button"
            onClick={() => handleOptionClick('popularity')}
            className="block w-full p-2 text-left text-slate-800 hover:bg-slate-100"
          >
            Popularity
          </button>
          <button
            type="button"
            onClick={() => handleOptionClick('release_date')}
            className="block w-full p-2 text-left text-slate-800 hover:bg-slate-100"
          >
            Release Date
          </button>
          <button
            type="button"
            onClick={() => handleOptionClick('rating')}
            className="block w-full p-2 text-left text-slate-800 hover:bg-slate-100"
          >
            Rating
          </button>
        </div>
      )}
    </div>
  );
};

export default SortMoviesFilter;
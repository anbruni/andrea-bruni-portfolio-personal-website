//create boiler plate for scrollpages hoirzopntal components from Movies.jsx
import { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';


const ScrollPages = ({ totalPages, maxPages, page, setPage, scrollTopRef = null }) => {
  const paginationRef = useRef(null);

  const scrollPagination = (direction) => {
    const container = paginationRef.current;
    if (!container) return;

    const pageButton = container.querySelector('button');
    const overlap = pageButton
      ? pageButton.offsetWidth + Number.parseFloat(getComputedStyle(container).columnGap)
      : 0;

    container.scrollBy({
      left: direction * Math.max(container.clientWidth - overlap, overlap),
      behavior: 'smooth',
    });
  };

  return (
    <nav aria-label="Movies pages" className="w-full mt-6 flex justify-center">
      <div className="flex max-w-full items-center gap-2 rounded-full border border-white/8 p-2 shadow-lg border border-white/10 bg-slate-900/75 backdrop-blur shadow-lg">
        <button
          type="button"
          aria-label="Show previous page numbers"
          onClick={() => scrollPagination(-1)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-600 text-slate-400 transition-colors hover:bg-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        >
          <ArrowLeft aria-hidden="true" className="h-5 w-5" />
        </button>
        <div
          id="pagination-container"
          ref={paginationRef}
          className="inline-flex max-w-xs items-center gap-1 px-1 overflow-x-auto scroll-smooth"
        >
          {Array.from({ length: Math.min(totalPages, maxPages) }, (_, index) => {
            const pageNumber = index + 1;
            const isCurrentPage = page === pageNumber;

            return (
              <button
                key={pageNumber}
                type="button"
                aria-label={`Go to page ${pageNumber}`}
                aria-current={isCurrentPage ? 'page' : undefined}
                onClick={() => {
                  setPage(pageNumber);
                  if (scrollTopRef?.current) {
                    scrollTopRef.current.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`flex h-9 min-w-9 items-center justify-center rounded-full px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
                  isCurrentPage
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          aria-label="Show next page numbers"
          onClick={() => scrollPagination(1)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-600 text-slate-400 transition-colors hover:bg-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        >
          <ArrowRight aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>
    </nav>
  );
};

export default ScrollPages;
//create an expander button component I can use to show specific things in the movie card if the user clicks on this expander button

import { useState } from 'react';


const Expander = ({ children, summary, providersByCountry = {} }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    Object.keys(providersByCountry).length > 0 &&
    <div className="w-full mt-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
      >
        <span>{isExpanded ? 'Show Less' : summary}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={`transition-all duration-500 overflow-hidden ${
          isExpanded ? 'h-fit opacity-100 mt-3' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="text-slate-300 text-sm">
          {children}
        </div>
      </div>
    </div>
  );
}

// const Expander = ({ children, summary }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="expander-container transition-all duration-300">
//       <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
//         {summary}
//       </div>
//       {isOpen && <div className="transition-all duration-300 ease-in-out">{children}</div>}
//     </div>
//   );
// };

export default Expander;

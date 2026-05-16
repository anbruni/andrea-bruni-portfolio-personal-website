import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  return (
    <nav className="px-8 py-6 flex justify-between items-center relative z-50">
      <div className="text-xl font-bold text-white font-heading">Andrea Bruni</div>


      <div className="hidden md:flex gap-6">
        {location.pathname === "/" ? null : (
          <Link to="/" className="hidden md:flex nav-link">
            Home
          </Link>
        )}
        <Link to="/contacts" className="nav-link">
          Contact
        </Link>
        <Link to="/work-projects" className="nav-link">
          Work & Projects
        </Link>
        <Link to="/download" className="nav-link">
          Download
        </Link>
      </div>
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {!isMenuOpen && <Menu size={24} />}
      </button>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="absolute top-0 right-0 bg-white rounded-bl-3xl shadow-lg p-6 flex flex-col gap-4 md:hidden w-64 h-fit w-fit z-50"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="flex justify-end">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-blue-900"
              >
                <X size={24} />
              </button>
            </div>
            <Link to="/contacts"
              className="nav-link-mobile"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link to="/work-projects"
              className="nav-link-mobile"
              onClick={() => setIsMenuOpen(false)}
            >
              Work & Projects
            </Link>
            <Link
              to="/download"
              className="nav-link-mobile"
              onClick={() => setIsMenuOpen(false)}
            >
              Download
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;

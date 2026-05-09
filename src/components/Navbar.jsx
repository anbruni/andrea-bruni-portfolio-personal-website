import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="px-8 py-6 flex justify-between items-center relative">
      <div className="text-xl font-bold text-white font-heading">Andrea Bruni</div>


      <div className="hidden md:flex gap-6">
        <a href="#contact" className="nav-link">
          Contact
        </a>
        <a href="#download" className="nav-link">
          Download
        </a>
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
            className="absolute top-0 right-0 bg-white rounded-bl-3xl shadow-lg p-6 flex flex-col gap-4 md:hidden w-64 h-fit w-fit"
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
            <a
              href="#contact"
              className="nav-link-mobile"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            <a
              href="#download"
              className="nav-link-mobile"
              onClick={() => setIsMenuOpen(false)}
            >
              Download
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;

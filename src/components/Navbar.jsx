// Navbar.jsx - Header orizzontale con nome a sinistra e nav links a destra

function Navbar() {
  return (
    <nav className="px-8 py-6 flex justify-between items-center">
      {/* Logo/Nome a sinistra */}
      <div className="text-xl font-bold text-white">
        Andrea Bruni
      </div>

      {/* Nav links a destra */}
      <div className="flex gap-6">
        <a 
          href="#contact" 
          className="text-slate-300 hover:text-white transition-colors duration-200"
        >
          Contact
        </a>
        <a 
          href="#download" 
          className="text-slate-300 hover:text-white transition-colors duration-200"
        >
          Download
        </a>
      </div>
    </nav>
  );
}

export default Navbar;

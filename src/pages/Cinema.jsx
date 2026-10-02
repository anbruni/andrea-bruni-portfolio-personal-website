import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Movies from '../components/Movies';

function CinemaPage({ location }) {
    const isHome = location.pathname === '/';
  return (
    <div className="min-h-screen min-w-screen flex flex-col items-start justify-start px-6 md:px-10 pb-24 pt-0 md:pt-10 md:pb-24 relative z-10">

      {isHome ? null : (
        <Link to="/" className="md:hidden btn-back mb-10">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      )}

      <h1 className="heading-1 mb-3">Get In Touch</h1>
      <p className="subtitle mb-12">I'm always open to new opportunities and conversations. I am located in Brno (Czech Republic) and available for remote work worldwide or on-site in Brno.</p>

      <div className="w-full border-t border-white/10 pt-12">
        <Movies />
      </div>

    </div>
  );
}

export default CinemaPage;
import Navbar from './components/Navbar';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import Starfield from './components/Starfield';
import HomePage from './pages/HomePage';
import ContactsPage from './pages/ContactsPage';
import WorkAndProjects from './pages/WorkAndProjects';
import CoursesAndEducation from './pages/CoursesAndEducation';
import PassionsHobbies from './pages/PassionsHobbies';
import CinemaPage from './pages/Cinema';
import Footer from './components/Footer';

function App() {
  const location = useLocation();
  const aboutRef = useRef(null);
  const topRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [aboutTop, setAboutTop] = useState(0);

  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });

    setAboutTop(aboutRef.current?.offsetTop ?? 0);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  return (
    <div
      ref={topRef}
      className="relative min-h-screen bg-gradient-to-b from-slate-950 from-50% via-indigo-950 via-80% to-violet-900"
    >
      <Starfield />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage aboutRef={aboutRef} />} />
        <Route
          path="/contacts"
          element={<ContactsPage location={location} />}
        />
        <Route
          path="/work-projects"
          element={<WorkAndProjects location={location} />}
        />
        <Route
          path="/courses-education"
          element={<CoursesAndEducation location={location} />}
        />
        <Route path="/passions-hobbies" element={<PassionsHobbies />} />
        <Route
          path="/passions-hobbies/cinema"
          element={<CinemaPage location={location} />}
        />
        <Route
          path="*"
          element={
            <main className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center relative z-10">
              <h1 className="heading-1 mb-3">Page not found</h1>
              <p className="subtitle mb-8">
                The page you’re looking for doesn’t exist.
              </p>
              <Link to="/" className="btn-back">
                Return home
              </Link>
            </main>
          }
        />
      </Routes>
      {aboutTop > 0 && scrollPosition > aboutTop - window.innerHeight + 300 && (
        <button
          aria-label="Scroll to top"
          className="btn-scroll fixed bottom-8 right-8 z-50"
          onClick={scrollToTop}
        >
          <ArrowUp />
        </button>
      )}
      <Footer />
    </div>
  );
}

export default App;

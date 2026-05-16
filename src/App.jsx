import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Starfield from './components/Starfield';
import HomePage from './pages/HomePage';
import ContactsPage from './pages/ContactsPage';
import WorkAndProjects from './pages/WorkAndProjects';
import mountains from './assets/snow-mountains.png';
import './App.css'


function App() {
  const location = useLocation();
  const aboutRef = useRef(null)
  const topRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [aboutTop, setAboutTop] = useState(0);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    if (aboutRef.current) {
      setAboutTop(aboutRef.current.offsetTop);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={topRef} className="relative min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-violet-800">
      <Starfield />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage aboutRef={aboutRef} />} />
        <Route path="/contacts" element={<ContactsPage location={location} />} />
        <Route path="/work-projects" element={<WorkAndProjects location={location} />} />
      </Routes>
      {aboutTop > 0 && scrollPosition > aboutTop - window.innerHeight + 300 && (
        <button className="btn-secondary fixed bottom-8 left-8 z-50" onClick={scrollToTop}>
          Scroll to Top
        </button>)
      }

      {/* Mountains */}
      <div className="w-full pointer-events-none overflow-hidden" style={{ height: '300px' }}>
        <img src={mountains} alt="" className="w-full h-full" style={{ objectFit: 'cover', objectPosition: 'top', transform: 'translateY(20px)' }} />
      </div>
    </div>
  );
}

export default App;

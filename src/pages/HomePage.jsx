import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';

function HomePage({ aboutRef }) {

    function scrollToAbout() {
        if (aboutRef.current) {
            aboutRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative z-10">
      <Hero onScrollToAbout={scrollToAbout} />
      <AboutSection ref={aboutRef} />
    </div>
  );
}

export default HomePage;

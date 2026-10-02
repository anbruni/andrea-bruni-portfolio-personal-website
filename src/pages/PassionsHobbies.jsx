import { ArrowLeft } from 'lucide-react';
import HobbyCard from '../components/Hobbies';
import { Link, useLocation } from 'react-router-dom';

const hobbies = [
  {
    title: 'Cinema',
    description:
      'I love getting lost in a good story, then discovering what makes it stay with me long after the credits.',
    eyebrow: 'A personal passion',
    meta: 'Films · Stories · Analysis',
    imageUrl: '/images/cinema-desktop.jpg',
    mobileImageUrl: '/images/cinema-mobile.jpg',
    to: 'cinema',
  },
];

function PassionsHobbies() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  return (
    <div className="min-h-screen flex flex-col items-start justify-center px-6 md:px-10 pb-24 pt-0 md:pt-10 md:pb-24 relative z-10 max-w-5xl mx-auto">
      {isHome ? null : (
        <Link to="/" className="md:hidden btn-back mb-10">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      )}
      <section className="w-full">
        <h1 className="heading-1 mb-3">Passions & Hobbies</h1>
        <p className="subtitle md:mb-12 mb-4">
          I enjoy exploring new technologies, engaging in creative projects, and
          spending time outdoors. Browse below to know more...
        </p>
        <div id="hobbies__cards" className="flex w-full flex-col gap-8">
          {hobbies.map((hobby) => (
            <HobbyCard key={hobby.title} {...hobby} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default PassionsHobbies;

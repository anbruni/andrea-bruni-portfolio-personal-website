
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';

const projects = [
    {
        title: 'Boulder Garage',
        tagline: 'Official website for a new indoor bouldering gym in Cumiana (TO), Italy.',
        description:
            'Built the full website for Boulder Garage, a bouldering gym opened by my brother in 2024 near Turin. The gym offers over 300m² of climbable surface across a boulder area, circuit walls, a Kilterboard, a teaching wall, and a training zone. The homepage features a full-screen automatic image carousel that cycles every 5 seconds. Designed with a mobile-first approach, the site is fully responsive across all screen sizes. It serves as the gym\'s main digital presence, presenting facilities, courses for kids and adults, contact info, and an embedded Google Maps location.',
        stack: ['React', 'Tailwind CSS', 'CSS', "Vanilla JS", 'React Router', 'Netlify'],
        liveUrl: 'https://www.bouldergarage.it/',
        futureDevelopments: [
            'Online booking system for courses and sessions',
            'Automated news section connected to the Instagram feed — zero manual editorial effort',
            'Customer area to view bookings and purchase memberships online',
            'Dedicated photo gallery section to showcase the gym spaces and climbing areas',
        ],
    },
    {
        title: 'Boulder Garage',
        tagline: 'Official website for a new indoor bouldering gym in Cumiana (TO), Italy.',
        description:
            'Built the full website for Boulder Garage, a bouldering gym opened by my brother in 2024 near Turin. The gym offers over 300m² of climbable surface across a boulder area, circuit walls, a Kilterboard, a teaching wall, and a training zone. The homepage features a full-screen automatic image carousel that cycles every 5 seconds. Designed with a mobile-first approach, the site is fully responsive across all screen sizes. It serves as the gym\'s main digital presence, presenting facilities, courses for kids and adults, contact info, and an embedded Google Maps location.',
        stack: ['React', 'Tailwind CSS', 'CSS', "Vanilla JS", 'React Router', 'Netlify'],
        liveUrl: 'https://www.bouldergarage.it/'
    },
];

function WorkAndProjects({ location }) {
    const isHome = location.pathname === '/';
    return (
        <div className="min-h-screen flex flex-col items-start justify-center px-6 md:px-10 pb-24 pt-0 md:pt-10 md:pb-24 relative z-10 max-w-5xl mx-auto">
            {isHome ? null : (
                <Link to="/" className="md:hidden btn-back mb-10">
                    <ArrowLeft size={16} />
                    Back to Home
                </Link>
            )}
            <h1 className="heading-1 mb-3">Work & Projects</h1>
            <p className="subtitle mb-12">Here you can find some of my recent work and projects.</p>

            <div className="flex flex-col gap-8 w-full">
                {projects.map((project) => (
                    <ProjectCard key={project.title} {...project} />
                ))}
            </div>
        </div>
    );
}

export default WorkAndProjects;
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';

const projects = [
  {
    title: 'Boulder Garage',
    tagline:
      'Official website for a new indoor bouldering gym in Cumiana, Italy.',
    description:
      "Boulder Garage is an indoor bouldering gym opened by my brother in 2025 near Turin, offering over 300m² of climbable surface across a boulder area, circuit walls, a Kilterboard, a teaching wall, and a training zone. I built their official website from scratch — the gym's main digital presence, presenting facilities, courses for kids and adults, contact info, and an embedded Google Maps location.",
    stack: [
      'React',
      'HTML',
      'Tailwind CSS',
      'CSS',
      'Vanilla JS',
      'React Router',
      'Netlify',
    ],
    liveUrl: 'https://www.bouldergarage.it/',
    futureDevelopments: [
      'Online booking system for courses and sessions',
      'Automated news section connected to the Instagram feed — zero manual editorial effort',
      'Customer area to view bookings and purchase memberships online',
      'Dedicated photo gallery section to showcase the gym spaces and climbing areas',
    ],
    overlayTitle: 'Boulder Garage',
    overlayDescription:
      'Official website for a new indoor bouldering gym in Cumiana, Italy.',
    overlayContent:
      'Developed with React and Tailwind CSS, following a mobile-first approach to ensure a flawless experience on any device. React Router manages dynamic routing — the site is a single-page application where each section is rendered on the fly when navigating through the navbar. Tailwind CSS handles all styling with a consistent design system. The homepage features a full-screen image carousel that auto-advances every 5 seconds. Deployed on Netlify with automatic builds on every push.',
    overlayImage: '/boulder-garage-photo1.png',
    overlayImage2: '/boulder-garage-photo2.png',
  },
  {
    title: 'Helix — In-Product Campaign Automation',
    tagline:
      'A human-in-the-loop AI platform for creating, managing, and optimizing the complete lifecycle of in-product campaigns.',
    description:
      'Developed in my role at Gendigital/Norton, Helix is an AI-augmented automation platform designed to simplify in-product campaign creation and lifecycle management. It transforms natural-language requests into deterministic, multi-step workflows for campaign setup, audience targeting, content configuration, experimentation, validation, and maintenance. Every sensitive operation includes dry-run previews, explicit human approval, auditability, and post-execution verification.',
    stack: [
      'Python',
      'LangGraph',
      'Model Context Protocol (MCP)',
      'FastMCP',
      'SQLite',
      'REST APIs',
      'BigQuery',
      'PostgreSQL',
      'OpenSearch',
      'Cursor',
      'Claude',
      'Gemini',
      'GitHub Copilot',
      'Pytest',
    ],
    liveUrl: '',
    futureDevelopments: [
      'End-to-end campaign creation from structured briefs and tickets',
      'Policy-based autonomy with configurable approval and risk levels',
      'Expanded campaign lifecycle and content-management capabilities',
      'Advanced campaign analytics and operational dashboards',
      'Role-based access control and reusable governance policies',
      'Improved execution monitoring, audit reporting, and observability',
      'Automated evaluation and optimization of AI-assisted workflows',
    ],
    overlayTitle: 'From Campaign Intent to Governed Execution',
    overlayDescription:
      'Helix converts natural-language campaign requirements into validated, previewed, and approval-gated operations.',
    overlayContent:
      "Developed in my role at Gendigital/Norton as part of the effort to automate, speedup and improve in-product campaign management, Helix automates the creation and management of in-product campaigns through a safety-first, human-in-the-loop architecture. Users can describe campaign requirements in natural language, including content, audience targeting, scheduling, experimentation, and lifecycle changes. Helix translates those requests into typed operations, identifies missing information, resolves the required entities, and produces a deterministic preview before making any changes. LangGraph manages the complete workflow—clarification, resolution, validation, preview, approval, execution, and verification—while SQLite checkpointing allows interrupted sessions to resume safely.\n\nModel Context Protocol integrations connect the platform to campaign services, analytics systems, content platforms, knowledge bases, issue trackers, and observability tools. All write operations are performed through tested Python workflows rather than AI-generated code, providing predictable execution, human oversight, traceability, fail-closed validation, and an auditable history throughout the campaign lifecycle.",
  },
  {
    title: 'Norton 360 for Windows - In-UI Store',
    tagline:
      'Official in-UI store for Norton 360 on Windows.',
    description:
      "In my role at Gendigital, working in the Norton team, I developed the Norton 360 in-UI store for Windows, enabling users to seamlessly browse, purchase, and manage Norton products directly within the application. The experience was designed to feel like a natural extension of the Norton 360 ecosystem, featuring responsive layouts, intuitive navigation, and deep integration with existing product workflows.\n\nI was responsible for the entire project lifecycle, from design and architecture to development, implementation, and quality assurance. One of the main challenges was building a highly personalized experience capable of targeting individual components, offers, and promotional banners to specific user segments while maintaining a consistent and seamless user journey.\n\nAchieving this required careful planning, scalable targeting logic, and extensive testing to ensure reliability across a global user base. Today, the store is viewed by millions of users worldwide and has delivered outstanding business results, achieving an 85% increase in bookings during A/B testing.",
    stack: [
      'CSS',
      'Vanilla JS',
      'HTML',
      'Targeting analysis',
      "MySQL",
      "BigQuery",
      "Power BI",
      "QA test",
      "AB Testing",
      "Figma design"
    ],
    liveUrl: '',
    futureDevelopments: [],
    overlayTitle: 'Norton 360 for Windows - In-UI Store',
    overlayDescription:
      'Official in-UI store for Norton 360 on Windows.',
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
      <p className="subtitle mb-12">
        Here you can find some of my recent work and projects.
      </p>

      <div className="flex flex-col gap-8 w-full">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </div>
  );
}

export default WorkAndProjects;

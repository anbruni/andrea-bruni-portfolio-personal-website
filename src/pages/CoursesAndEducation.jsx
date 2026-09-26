import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const education = [
  {
    institution: 'Masarykova univerzita',
    degree: 'Ing. — M.Sc. Public Finance & Economics (Double Degree)',
    dates: '2020 – 2021',
    grade: 'Grade A',
    country: 'Brno - Czech Republic',
    description: 'A double-degree master’s program in public finance and economics.',
  },
  {
    institution: 'Università del Piemonte Orientale',
    degree: 'M.Sc. Management & Business Economics',
    dates: '2019 – 2021',
    grade: '110/110 cum laude',
    country: 'Turin - Italy',
    description: 'A master’s degree focused on management and business economics.',
  },
  {
    institution: 'Università degli Studi di Torino',
    degree: 'B.A. Linguistic & Cultural Mediation',
    dates: '2014 – 2018',
    grade: '100/110',
    country: 'Turin - Italy',
    description: 'A bachelor’s degree in linguistic and cultural mediation.',
  },
];

const courses = [
  {
    institution: 'FreeCodeCamp',
    degree: 'Full Stack Web Development',
    dates: '2022 – 2023',
    grade: 'Completed',
    country: 'Online',
    description: 'Comprehensive online course covering full stack web development.',
  },
  {
    institution: 'Coursera',
    degree: 'Data Science Specialization',
    dates: '2021 – 2022',
    grade: 'Completed',
    country: 'Online',
    description: 'Series of courses focused on data science and analytics.',
  },
];

function CoursesAndEducation({ location }) {
  const isHome = location.pathname === '/';
  return (
    <div className="min-h-screen flex flex-col items-start justify-center px-6 md:px-10 pb-24 pt-0 md:pt-10 md:pb-24 relative z-10 max-w-5xl mx-auto">
      {isHome ? null : (
        <Link to="/" className="md:hidden btn-back mb-10">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      )}
      <div className="flex flex-col md:gap-24 gap-12 w-full">
      <section className="w-full">
      <h1 className="heading-1 mb-3">Education</h1>
      <p className="subtitle md:mb-12 mb-4">
        Academic background in economics, management, and linguistic and cultural mediation.
      </p>

      <div className="flex flex-col gap-8 w-full">
        {education.map((item) => (
          <article key={item.institution} className="card-glow backdrop-blur-sm rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="heading-2 mb-1">{item.institution}</h2>
                <p className="text-slate-300 text-sm md:text-base">{item.degree}</p>
              </div>
              <p className="text-slate-400 text-sm md:text-right shrink-0">
                {item.dates}<br />{item.grade}<br />{item.country}
              </p>
            </div>
            <p className="mt-4 text-slate-200 text-sm md:text-base leading-relaxed">
              {item.description}
            </p>
          </article>
        ))}
      </div>
      </section>

      <section className="w-full">
      <h1 className="heading-1 mb-3">Courses & skill improvement</h1>
      <p className="subtitle md:mb-12 mb-4">
        Online courses, tutorials, coding exercises and other resources for skill improvement.
      </p>

      <div className="flex flex-col gap-8 w-full">
        {courses.map((item) => (
          <article key={item.institution} className="card-glow backdrop-blur-sm rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="heading-2 mb-1">{item.institution}</h2>
                <p className="text-slate-300 text-sm md:text-base">{item.degree}</p>
              </div>
              <p className="text-slate-400 text-sm md:text-right shrink-0">
                {item.dates}<br />{item.grade}
              </p>
            </div>
            <p className="mt-4 text-slate-200 text-sm md:text-base leading-relaxed">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
    </div>
    </div>
  );
}

export default CoursesAndEducation;

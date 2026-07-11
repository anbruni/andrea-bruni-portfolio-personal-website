
const profileHighlights = [
    'In-product campaigns',
    'Marketing automation',
    'Experimentation & analytics',
    'Frontend implementation',
    'AI-assisted workflows',
    'Governed automation',
];

function AboutSection({ ref }) {

    return (
        <div ref={ref} className="relative w-full">
            <div className="min-h-screen px-6 md:px-16 py-14 relative z-10 max-w-5xl mx-auto flex items-center">
                <div className="w-full bg-white/10 backdrop-blur-lg rounded-lg p-6 md:p-10 shadow-lg border border-white/10">
                    <p className="text-french-blue-light text-sm font-semibold uppercase tracking-[0.2em] mb-3">Profile</p>
                    <h1 className="heading-1 mb-6">About Me</h1>

                    <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr] items-start">
                        <div>
                            <p className="subtitle mb-6">
                                I'm Andrea Bruni, a Principal Campaign Developer and Front-End Developer based in Brno. I build in-product campaigns and AI-assisted workflows that turn business requirements into measurable, scalable, governed digital experiences.
                            </p>
                            <p className="subtitle mb-6">
                                My work sits at the intersection of campaign technology, marketing automation, analytics, and frontend implementation. I manage the full campaign lifecycle, from audience logic, architecture, and development to QA validation, production launch, monitoring, A/B testing, and lifecycle analysis.
                            </p>
                            <p className="subtitle mb-6">
                                I also design AI-assisted tools and governed automation that improve campaign quality, accelerate troubleshooting, and reduce manual work while keeping human oversight, validation, and auditability in place. I see AI as an amplifier for knowledge and execution, not as a replacement for people.
                            </p>
                            <p className="subtitle">
                                Outside work, I keep sharpening my technical skills through online courses, stay active with sport, and spend a lot of time with cinema: watching new films, studying directing styles, and digging into the stories behind how they were made.
                            </p>
                        </div>

                        <aside className="rounded-lg border border-white/10 bg-slate-950/30 p-5 md:p-6">
                            <h2 className="text-2xl md:text-3xl font-semibold text-white font-heading mb-4">What I connect</h2>
                            <div className="flex flex-wrap gap-3 mb-6">
                                {profileHighlights.map((highlight) => (
                                    <span key={highlight} className="rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm font-medium text-slate-200">
                                        {highlight}
                                    </span>
                                ))}
                            </div>
                            <div className="space-y-4 text-slate-300">
                                <p>
                                    Senior, hands-on contributor combining in-product campaign ownership, frontend delivery, analytics, and automation.
                                </p>
                                <p>
                                    Delivered the Norton In-UI Store for Antivirus, A/B tested at +85% uplift in QA bookings and live to millions of users.
                                </p>
                                <p>
                                    Built Helix, an AI-augmented operations platform with deterministic execution, human approvals, and auditability.
                                </p>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;
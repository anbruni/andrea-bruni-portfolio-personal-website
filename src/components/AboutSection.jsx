
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
            <div className="min-h-screen px-6 md:px-12 py-14 relative z-10 max-w-7xl mx-auto flex items-center">
                <div className="w-full bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-10 shadow-lg border border-white/10">
                    <p className="text-french-blue-light text-sm font-semibold uppercase tracking-[0.2em] mb-3">Profile</p>
                    <h1 className="heading-1 mb-6">About Me</h1>

                    <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr] items-start">
                        <div>
                            <p className="subtitle mb-6">
                                I'm Andrea Bruni, a Principal Campaign Developer and Front-End Developer based in Brno. I build in-product campaigns and AI-assisted workflows that turn business requirements into measurable, scalable, governed digital experiences.
                            </p>
                            <section className="mb-6">
                                <h2 className="text-lg font-semibold text-white mb-2">Focus</h2>
                                <p className="text-slate-300 leading-relaxed">
                                    My work connects campaign technology, marketing automation, analytics, and frontend implementation. I manage the campaign lifecycle from audience logic and development through QA, launch, monitoring, A/B testing, and performance analysis.
                                </p>
                            </section>
                            <section className="mb-6">
                                <h2 className="text-lg font-semibold text-white mb-2">Approach</h2>
                                <p className="text-slate-300 leading-relaxed">
                                    I design AI-assisted tools and governed automation to improve campaign quality, speed up troubleshooting, and reduce manual work. Human oversight, validation, and auditability stay central: I see AI as an amplifier for people, not a replacement.
                                </p>
                            </section>
                            <section>
                                <h2 className="text-lg font-semibold text-white mb-2">Beyond work</h2>
                                <p className="text-slate-300 leading-relaxed">
                                Outside work, I keep sharpening my technical skills through online courses, stay active with sport, and spend a lot of time with cinema: watching new films, studying directing styles, and digging into the stories behind how they were made.
                                </p>
                            </section>
                        </div>

                        <aside className="rounded-2xl border border-white/10 bg-slate-950/30 p-5 md:p-6">
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
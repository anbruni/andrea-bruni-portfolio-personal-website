import { ExternalLink } from 'lucide-react';

function ProjectCard({ title, tagline, description, stack, liveUrl = '', futureDevelopments = [] }) {
    return (
        <div
            key={title}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 flex flex-col gap-5"
        >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                <div>
                    <h2 className="heading-2 mb-1">{title}</h2>
                    <p className="text-slate-400 text-sm md:text-base">{tagline}</p>
                </div>
                {liveUrl && (
                    <a
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-back self-start shrink-0"
                    >
                        <ExternalLink size={14} />
                        Live site
                    </a>
                )}
            </div>

            {/* Description */}
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                {description}
            </p>

            {/* Stack */}
            <div className="flex flex-wrap gap-2">
                {stack.map((tech) => (
                    <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-slate-200 border border-white/10"
                    >
                        {tech}
                    </span>
                ))}
            </div>

            {/* Future developments */}
            {futureDevelopments.length > 0 && (
                <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
                        Future developments
                    </p>
                    <ul className="flex flex-col gap-2">
                    {futureDevelopments.map((item) => (
                        <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-slate-300"
                        >
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>)}
        </div>
    );
}

export default ProjectCard;

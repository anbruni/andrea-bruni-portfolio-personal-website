import { ExternalLink, ScanEye } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import ImageLightbox from './ImageLightbox';

function ProjectCard({ title, tagline, description, stack, liveUrl = '', futureDevelopments = [], overlayTitle, overlayDescription, overlayContent, overlayImage, overlayImage2 }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const leaveTimer = useRef(null);
    const cardRef = useRef(null);

    const handleEnter = () => {
        clearTimeout(leaveTimer.current);
        setIsHovered(true);
    };
    const handleLeave = () => {
        if (isClicked) return; // Don't hide if it's clicked
        leaveTimer.current = setTimeout(() => setIsHovered(false), 80);
    };

    useEffect(() => {
        const docClick = (e) => {
            if (cardRef.current && cardRef.current.contains(e.target)) {
                return;
            }
            setIsClicked(false);
            setIsHovered(false);
        };
        const escapeListener = (e) => {
            if (e.key === 'Escape') {
                setIsClicked(false);
                setIsHovered(false);
            }
        };
        document.addEventListener('keydown', escapeListener);
        document.addEventListener('click', docClick);
        return () => {
            document.removeEventListener('click', docClick);
            document.removeEventListener('keydown', escapeListener);
        };
    }, []);

    return (
        <div
            ref={cardRef}
            key={title}
            className={`card-glow relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 flex flex-col gap-5 cursor-pointer`}
            style={{
                ...(isHovered || isClicked ? { animationPlayState: 'paused' } : {}),
                ...(isClicked ? { transform: 'translateY(0)' } : {}),
            }}
            onClick={() => setIsClicked(true)}
        >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                <div>
                    <h2 className="heading-2 mb-1">{title}</h2>
                    <p className="text-slate-400 text-sm md:text-base">{tagline}</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-3">
                    {liveUrl && (
                        <a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-back shrink-0"
                        >
                            <ExternalLink size={14} />
                            Live site
                        </a>
                    )}
                    <button
                        className="hidden md:inline-flex btn-hover-trigger shrink-0"
                        onMouseEnter={handleEnter}
                        onMouseLeave={handleLeave}
                    >
                        <ScanEye size={13} />
                        More details
                    </button>
                </div>
            </div>
            <ProjectOverlay title={overlayTitle} description={overlayDescription} url={liveUrl} image={overlayImage} image2={overlayImage2} content={overlayContent} isHovered={isHovered} setIsHovered={setIsHovered} isClicked={isClicked} setIsClicked={setIsClicked} onMouseEnter={handleEnter} onMouseLeave={handleLeave} />

            {/* Description */}
            <p className="text-slate-200 text-sm md:text-base leading-relaxed font-medium text-center w-full">
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

function ProjectOverlay({ title, description, url, image, image2, content, isHovered, isClicked, setIsHovered, setIsClicked, onMouseEnter, onMouseLeave }) {
    const [lightboxSrc, setLightboxSrc] = useState(null);
    return (
        <>
        <ImageLightbox src={lightboxSrc} alt={title} onClose={() => setLightboxSrc(null)} />
        <div
            className={`absolute -inset-4 z-10 bg-slate-900/95 backdrop-blur-md rounded-3xl flex flex-col p-5 md:p-8 gap-4 transition-all duration-300 ease-out ${isHovered || isClicked ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
                }`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={(event) => event.stopPropagation()}
        >
            {/* Close button */}
            {isClicked && (
                <div className="flex justify-end">
                    <button className="md:absolute md:top-8 md:right-8 btn-back z-50" onClick={(event) => { event.stopPropagation(); setIsHovered(false); setIsClicked(false); }}>close</button>
                </div>
            )}

            {/* Two-column layout */}
            <div className="flex flex-col md:flex-row gap-4 flex-1 min-h-0">

                {/* Left column — images: single image on mobile, stacked on desktop */}
                <div className="md:w-1/2 flex-shrink-0 flex flex-col gap-2 min-h-0">
                    <div className="h-52 md:flex-1 rounded-xl overflow-hidden bg-white/10 border border-white/10 flex items-center justify-center min-h-0 cursor-zoom-in" onClick={(e) => { e.stopPropagation(); setLightboxSrc(image); }}>
                        {image
                            ? <img src={image} alt={title} className="w-full h-full object-cover object-top pointer-events-none" />
                            : <span className="text-slate-500 text-xs tracking-widest uppercase">Preview</span>
                        }
                    </div>
                    {image2 && (
                        <div className="hidden md:flex flex-1 rounded-xl overflow-hidden bg-white/10 border border-white/10 items-center justify-center min-h-0 cursor-zoom-in" onClick={(e) => { e.stopPropagation(); setLightboxSrc(image2); }}>
                            <img src={image2} alt={`${title} 2`} className="w-full h-full object-cover object-top pointer-events-none" />
                        </div>
                    )}
                </div>

                {/* Right column — title, content, CTA */}
                <div className="md:w-1/2 flex flex-col justify-center gap-4">
                    <div>
                        <h3 className="text-white font-semibold text-xl mb-3">{title}</h3>
                        {content && <p className="text-slate-300 text-sm leading-relaxed">{content}</p>}
                    </div>
                    {url && (
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-back inline-flex items-center gap-2 self-start"
                        >
                            <ExternalLink size={14} />
                            View project
                        </a>
                    )}
                </div>

            </div>
        </div>
        </>
    )
}

export default ProjectCard;

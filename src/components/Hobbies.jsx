import { Clapperboard, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

function HobbyCard({
  title,
  description,
  imageUrl,
  mobileImageUrl,
  eyebrow = 'A personal passion',
  meta,
  to,
}) {
  return (
    <Link to={to} aria-label={`Open ${title} hobby`} className="block h-full">
      <article className="group card-glow relative isolate aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900 md:aspect-[16/7] cursor-pointer">
      {/* The picture keeps the card art full-bleed while allowing a dedicated mobile crop. */}
      <picture>
        {mobileImageUrl && <source media="(max-width: 767px)" srcSet={mobileImageUrl} />}
        <img
          src={imageUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 ease-out group-hover:scale-125"
        />
      </picture>

      {/* Readability layer over the image. */}
      <div className="absolute inset-0 -z-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-slate-950/5" />
      <div className="absolute inset-0 -z-0 bg-gradient-to-r from-slate-950/65 via-transparent to-transparent opacity-80" />

      {/* Decorative cinema frame. */}
      <div className="pointer-events-none absolute inset-3 rounded-xl border border-white/20 md:inset-5" />
      <div className="pointer-events-none absolute left-7 top-7 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/60 md:left-10 md:top-10">
        <Sparkles size={12} />
        {eyebrow}
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end p-7 md:p-10">
        <div className="max-w-2xl transition-transform duration-500 group-hover:-translate-y-1">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-md">
            <Clapperboard size={14} />
            {meta || 'Cinema'}
          </div>
          <h2 className="font-heading text-4xl font-medium tracking-tight text-white md:text-6xl">
            {title}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-200 md:text-lg">
            {description}
          </p>
        </div>
      </div>
      </article>
    </Link>
  );
}

export default HobbyCard;

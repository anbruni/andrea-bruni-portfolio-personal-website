# Portfolio Website Plan - Andrea Bruni

## Overview
Costruire un sito portfolio personale moderno con React + Vite, partendo da una landing page a tutto schermo che presenta Andrea, i suoi ruoli professionali con animazioni fluide, e link esterni. Design dark mode con accenti colorati, completamente responsive.

**Tech Stack:**
- React 19 + Vite (già configurato)
- Tailwind CSS (responsive-first)
- Framer Motion (animazioni slide verticali)

**Design:**
- **Layout**: Navbar orizzontale (nome sx, nav links dx) + Hero centrato full-screen + CTA button
- **Background**: Dark French Blue gradient (#0F172A → #1E3A5F)
- **Primary color**: French Blue (#0055A4) per pulsanti e accenti
- **Secondary colors**: Lighter Blue (#3B82F6) per hover, White (#FFFFFF) per testi principali
- **Font**: Inter per tutto (leggibilità e coerenza)
- **Mobile-first**: Navbar collassabile, spacing responsive, testi adattivi con Tailwind

## Implementation Steps

**Phase 1: Setup & Dependencies**

1. Installare Tailwind CSS e configurazione
   - npm install -D tailwindcss postcss autoprefixer
   - npx tailwindcss init -p
   - Configurare tailwind.config.js con content paths
   - Aggiungere direttive Tailwind a index.css

2. Installare Framer Motion e Google Fonts
   - npm install framer-motion
   - Aggiungere font link in index.html (Inter + Space Grotesk)

**Phase 2: Component Structure**

3. Creare struttura componenti (*depends on 1-2*)
   - `src/components/Navbar.jsx` - Header orizzontale con nome (sx) e nav links (dx)
   - `src/components/Hero.jsx` - Sezione centrata con headline e ruolo animato
   - `src/components/AnimatedRoles.jsx` - Componente per ruoli rotanti inline
   - `src/components/DownloadCVButton.jsx` - CTA button per scaricare CV in PDF
   - `src/components/SocialLinks.jsx` - Link a LinkedIn e sito arrampicata (footer)

4. Pulire App.jsx (*depends on 3*)
   - Rimuovere boilerplate Vite
   - Importare e comporre componenti Hero

**Phase 3: Hero Section Implementation**

5. Implementare Hero.jsx (*depends on 3-4*)
   - Layout full-screen centrato (h-screen flex items-center justify-center)
   - Background gradient French Blue (bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900)
   - Headline: "Hey, sono Andrea Bruni, a" + AnimatedRoles component inline
   - Typography: text-4xl md:text-6xl, font-medium per tono personale
   - Flex verticale: headline → DownloadCVButton con spacing responsive (gap-8)

6. Implementare AnimatedRoles.jsx (*parallel with 5*)
   - Array di ruoli: ["Campaign Specialist", "Front-End Developer", "Growth Engineer", "AI Enthusiast"]
   - Hook useState per tracciare ruolo corrente (index)
   - useEffect con setInterval per rotazione ogni 3 secondi + cleanup function
   - Framer Motion AnimatePresence + motion.span per slide verticale smooth
   - Varianti: initial {y: 20, opacity: 0}, animate {y: 0, opacity: 1}, exit {y: -20, opacity: 0}
   - Inline component: deve integrarsi nella frase "Hey, sono Andrea Bruni, a [ruolo]"
   - Color: text-blue-400 per distinguere ruolo dal resto del testo

7. Implementare DownloadCVButton.jsx (*parallel with 5-6*)
   - Button component con props: href (link al PDF), label ("Download CV")
   - Styling: bg-blue-600 hover:bg-blue-700, px-8 py-4, rounded-lg, text-lg font-semibold
   - Icon: lucide-react Download icon + label
   - Hover effect: scale-105 transform transition, shadow-lg
   - Link comportamento: download attribute, apertura in nuova tab come fallback

8. Implementare SocialLinks.jsx (*parallel with 7*)
   - Array di links: [{label: "LinkedIn", url: "..."}, {label: "Climbing Gym", url: "..."}]
   - Flex row gap con icone (lucide-react: Linkedin, ExternalLink)
   - Positioning: fixed bottom o dentro Hero sotto il button
   - Styling: text-slate-400 hover:text-blue-400, transizioni smooth

**Phase 4: Navigation & Polish**

9. Implementare Navbar.jsx (*depends on 5-8*)
   - Layout orizzontale: flex justify-between items-center, px-8 py-6
   - Sinistra: "Andrea Bruni" (text-xl font-bold text-white)
   - Destra: nav links (Contact, Download) - flex gap-6
   - Styling: non-fixed per ora (static/relative), transparent background
   - Mobile: stack verticale (flex-col) oppure hamburger icon placeholder
   - Link styling: text-slate-300 hover:text-white transition-colors

10. Styling finale e responsive testing (*depends on 5-9*)
   - **Mobile (375px)**: Navbar stack verticale, headline text-3xl, button full-width (w-full md:w-auto)
   - **Tablet (768px)**: Navbar orizzontale, headline text-5xl, spacing intermedio
   - **Desktop (1280px+)**: Layout completo, headline text-6xl, max-width container
   - Testare animazione ruoli su tutti i breakpoints (no overflow, smooth transition)
   - Verificare contrast ratio testi su French Blue background (WCAG AA compliance)
   - Download button: testare link funziona, file scarica correttamente

## Relevant Files

**Da modificare:**
- [src/App.jsx](src/App.jsx) - Rimuovere boilerplate, comporre Hero
- [src/index.css](src/index.css) - Aggiungere direttive Tailwind, rimuovere CSS default
- [src/main.jsx](src/main.jsx) - Nessuna modifica necessaria
- [index.html](index.html) - Aggiornare title, aggiungere Google Fonts links
- [tailwind.config.js](tailwind.config.js) - Creare e configurare (content, theme extend con colori custom)
- [package.json](package.json) - Dipendenze installate automaticamente

**Da creare:**
- `src/components/Navbar.jsx` - Header orizzontale con nome e nav links
- `src/components/Hero.jsx` - Sezione centrata con headline "Hey, sono Andrea Bruni, a [ruolo]"
- `src/components/AnimatedRoles.jsx` - Ruoli rotanti inline con Framer Motion (slide verticale)
- `src/components/DownloadCVButton.jsx` - CTA button per download CV PDF
- `src/components/SocialLinks.jsx` - Link LinkedIn e sito arrampicata
- `public/andrea-bruni-cv.pdf` - CV in PDF da scaricare (placeholder per ora)

**Riferimenti architettonici:**
- Usare Tailwind utility-first approach (no CSS custom se possibile)
- Framer Motion per AnimatePresence pattern con array di elementi
- React hooks: useState per state locale, useEffect per side effects (interval)
- Component composition in App.jsx (no prop drilling ora)

## Verification Steps

1. **Build check**: `npm run dev` senza errori
2. **Visual test**: 
   - Navbar: "Andrea Bruni" a sinistra, "Contact" e "Download" a destra
   - Hero centrato: "Hey, sono Andrea Bruni, a [ruolo animato]"
   - Button "Download CV" sotto headline con French Blue background
   - Social links visibili (LinkedIn, Climbing Gym)
3. **Animation test**: Ruoli cambiano ogni 3 secondi con slide verticale smooth, no flickering
4. **Responsive test**: 
   - Mobile 375px: navbar stack, headline 3xl, button full-width
   - Tablet 768px: navbar horizontal, headline 5xl
   - Desktop 1920px: layout ottimale, headline 6xl, centrato
5. **Download CV test**: Click button scarica PDF o apre in nuova tab
6. **Link test**: LinkedIn e sito arrampicata aprono in nuova tab
7. **Hover effects**: Button scale-up, links color transition smooth
8. **Font loading**: Inter carica correttamente (verifica Network tab)

## Decisions & Scope

**Included:**
- Landing page completa e funzionale con layout professionale
- Navbar orizzontale (nome sx, nav links dx) - preparata per sezioni future
- Hero section: headline personale "Hey, sono Andrea Bruni, a [ruolo animato]"
- Animazioni fluide con Framer Motion (slide verticale sui ruoli)
- Download CV button con French Blue styling e hover effects
- Social links (LinkedIn, Climbing Gym site)
- Design system French Blue con Tailwind (mobile-first, responsive built-in)

**Excluded (future iterations):**
- Routing (React Router) - non serve per singola pagina ora
- Sezioni multiple (About, Work, Projects) - aggiungere dopo
- Navbar mobile menu funzionale - preparare struttura solo
- Form contatti - non richiesto
- CMS/backend - contenuto statico per ora
- Dark/light mode toggle - dark only per ora

**Technical decisions:**
- Tailwind > CSS custom: più educativo per pattern responsive, meno verboso
- Framer Motion > CSS keyframes: API più intuitiva, meno codice, ottima per imparare animazioni React
- Google Fonts > local fonts: più semplice, CDN veloce
- Lucide React icons > custom SVG: consistenza e semplicità

**Design rationale:**
- **French Blue (#0055A4)**: Elegante, professionale, distintivo - ottimo per tech/corporate background
- **Dark gradient background**: Profondità visiva, focus sul contenuto, meno affaticante
- **Navbar orizzontale**: Pattern familiare, UX intuitiva, scalabile per sezioni future
- **"Hey, sono Andrea"**: Tono personale e accogliente, differenzia da portfolio sterili
- **Slide verticale**: Animazione fluida e moderna, meno aggressiva del typing effect
- **Download CV button**: Clear CTA, facilita recruiters, azione primaria evidente
- **Mobile-first Tailwind**: Responsive built-in, utility classes rapide, manutenibilità alta
- **Inter font only**: Coerenza tipografica, leggibilità eccellente, carica veloce (1 font family)

## Learning Opportunities per Andrea

Ogni step introduce concetti React chiave:
- **Step 1-2**: Setup tooling (impara ecosistema moderno: Tailwind + Framer Motion)
- **Step 3-4**: Component composition e thinking in components (Navbar + Hero + Buttons)
- **Step 5**: Props, JSX con Tailwind, layout patterns (flex, grid, spacing responsive)
- **Step 6**: **Hooks core** - useState (gestione index ruoli), useEffect (setInterval + cleanup function)
- **Step 7**: Conditional rendering, props destructuring, reusable components (Button)
- **Step 8**: Component reusability, mapping arrays to JSX (social links)
- **Step 9**: Layout composition (Navbar + Hero), conditional classes Tailwind
- **Step 10**: Responsive design patterns, mobile-first approach, breakpoint testing

**Concetti React avanzati coperti:**
- **Framer Motion**: AnimatePresence, motion components, animation variants, key prop per re-mount
- **Component lifecycle**: capire quando componenti re-renderizzano, cleanup effects
- **Event handling**: onClick, onMouseEnter, link behavior (download attribute)
- **Conditional styling**: template literals per classi dinamiche, hover states
- **File structure**: separazione concerns (1 componente = 1 file), import/export ES6

**Patterns professionale appresi:**
- Mobile-first responsive design con Tailwind breakpoints
- Reusable button components con props configurable
- Animation timing e UX considerations (3s interval, smooth transitions)
- Accessibility basics (contrast ratio, semantic HTML, download links)

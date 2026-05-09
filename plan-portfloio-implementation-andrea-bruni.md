# Portfolio Website Plan - Andrea Bruni

## Overview
Costruire un sito portfolio personale moderno con React + Vite, partendo da una landing page a tutto schermo che presenta Andrea, i suoi ruoli professionali con animazioni fluide, e link esterni. Design dark mode con accenti colorati, completamente responsive.

**Tech Stack:**
- React 19 + Vite (già configurato)
- Tailwind CSS (responsive-first)
- Framer Motion (animazioni slide verticali)

**Design:**
- Background: Dark gradient (slate-900 → slate-800)
- Accenti: Cyan (#06b6d4) + Violet (#8b5cf6)
- Font: Inter per UI, Space Grotesk per titoli (Google Fonts)
- Mobile-first con Tailwind

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
   - `src/components/Hero.jsx` - Container principale landing page
   - `src/components/AnimatedRoles.jsx` - Componente per ruoli rotanti
   - `src/components/SocialLinks.jsx` - Link a LinkedIn e sito arrampicata
   - `src/components/Navbar.jsx` - Nav bar (placeholder per sezioni future)

4. Pulire App.jsx (*depends on 3*)
   - Rimuovere boilerplate Vite
   - Importare e comporre componenti Hero

**Phase 3: Hero Section Implementation**

5. Implementare Hero.jsx (*depends on 3-4*)
   - Layout full-screen con Tailwind (h-screen, flex, items-center, justify-center)
   - Background gradient dark con Tailwind classes
   - Nome grande e centrato (text-6xl md:text-8xl, font-bold)
   - Struttura flex verticale responsive

6. Implementare AnimatedRoles.jsx (*parallel with 5*)
   - Array di ruoli: ["Software Engineer @ Avast/Norton", "Full-Stack Developer", "Climbing Enthusiast", "Problem Solver"]
   - Hook useState per tracciare ruolo corrente
   - useEffect con setInterval per rotazione ogni 3 secondi
   - Framer Motion AnimatePresence + motion.div per slide verticale
   - Varianti: initial {y: 20, opacity: 0}, animate {y: 0, opacity: 1}, exit {y: -20, opacity: 0}

7. Implementare SocialLinks.jsx (*parallel with 5-6*)
   - Flex row gap con icone social (lucide-react per icone LinkedIn/Link)
   - Link styled con Tailwind: hover effects, transizioni smooth
   - Props: label e url per riutilizzabilità

**Phase 4: Navigation & Polish**

8. Implementare Navbar.jsx (*depends on 5-7*)
   - Fixed top con backdrop-blur (Tailwind: fixed top-0 backdrop-blur-md)
   - Logo/nome a sinistra
   - Nav links a destra (per ora commentati/disabilitati)
   - Mobile: hamburger menu placeholder (non implementato ora)

9. Styling finale e responsive testing (*depends on 5-8*)
   - Testare breakpoints Tailwind (sm, md, lg, xl)
   - Aggiustare spacing e font sizes per mobile
   - Verificare animazioni su dispositivi diversi
   - Dark gradient polishing

## Relevant Files

**Da modificare:**
- [src/App.jsx](src/App.jsx) - Rimuovere boilerplate, comporre Hero
- [src/index.css](src/index.css) - Aggiungere direttive Tailwind, rimuovere CSS default
- [src/main.jsx](src/main.jsx) - Nessuna modifica necessaria
- [index.html](index.html) - Aggiornare title, aggiungere Google Fonts links
- [tailwind.config.js](tailwind.config.js) - Creare e configurare (content, theme extend con colori custom)
- [package.json](package.json) - Dipendenze installate automaticamente

**Da creare:**
- `src/components/Hero.jsx` - Container landing page full-screen
- `src/components/AnimatedRoles.jsx` - Logica animazione ruoli con Framer Motion
- `src/components/SocialLinks.jsx` - Link social stilizzati
- `src/components/Navbar.jsx` - Navigation bar (preparazione futura)

**Riferimenti architettonici:**
- Usare Tailwind utility-first approach (no CSS custom se possibile)
- Framer Motion per AnimatePresence pattern con array di elementi
- React hooks: useState per state locale, useEffect per side effects (interval)
- Component composition in App.jsx (no prop drilling ora)

## Verification Steps

1. **Build check**: `npm run dev` senza errori
2. **Visual test**: Landing page mostra nome, ruoli animati, link social
3. **Animation test**: Ruoli cambiano ogni 3 secondi con slide smooth
4. **Responsive test**: Aprire DevTools, testare mobile (375px), tablet (768px), desktop (1920px)
5. **Link test**: Click su LinkedIn e sito arrampicata aprono URL corretti in nuova tab
6. **Hover effects**: Link social hanno transizioni smooth al passaggio mouse
7. **Font loading**: Inter e Space Grotesk caricano correttamente (verifica in Network tab)

## Decisions & Scope

**Included:**
- Landing page completa e funzionale
- Animazioni fluide con Framer Motion (learning opportunity)
- Design system con Tailwind (responsive built-in)
- Navbar preparata ma non collegata (no scroll behavior)

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
- Palette cyan + violet: moderno, tech-oriented, buon contrasto su dark
- Slide verticale: meno aggressive del typing, più elegante del fade
- Full-screen hero: impatto immediato, focus sull'identità
- Space Grotesk per titoli: geometrico, distintivo, ottimo per branding personale

## Learning Opportunities per Andrea

Ogni step introduce concetti React chiave:
- **Step 1-2**: Setup tooling (impara ecosistema moderno)
- **Step 3-4**: Component composition (thinking in components)
- **Step 5**: Props e JSX con Tailwind (styling React way)
- **Step 6**: Hooks (useState, useEffect), side effects, cleanup
- **Step 7**: Component reusability, props destructuring
- **Step 8**: Conditional rendering, future state preparation
- **Step 9**: Responsive design patterns con Tailwind

Framer Motion introduce: AnimatePresence, motion components, variants, layout animations

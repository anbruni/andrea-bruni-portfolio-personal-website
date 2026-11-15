# Andrea Bruni | Portfolio

A personal portfolio website for presenting Andrea's professional profile, selected projects, education, and contact information. It brings campaign development, marketing automation, analytics, frontend work, and AI-assisted workflow projects together in one responsive website.

## Purpose

The website has two goals:

- Give recruiters, collaborators, and clients a clear overview of Andrea's experience, skills, projects, and background.
- Provide a practical project for building and improving a modern React application, including routing, reusable components, responsive layouts, and animation.

## Website

The site includes:

- A home page with an animated introduction, CV link, and profile section.
- A work and projects page with project descriptions, technology lists, and additional project details.
- An education page covering academic degrees and results.
- A contact page with email, phone, LinkedIn, and GitHub links.
- A cinema area for discovering movies, checking watch providers, and viewing personal reviews.
- Responsive desktop and mobile navigation, plus a decorative starfield background.

## Built With

- React 19 for the user interface and component-based structure.
- Vite 8 for local development and production builds.
- React Router for client-side page navigation.
- Tailwind CSS 3 for responsive styling and utility classes, with custom styles in CSS files.
- Framer Motion for interface transitions.
- Lucide React for icons.
- Inter and Space Grotesk fonts, loaded from Google Fonts.
- A small Node.js proxy for TMDB API requests, keeping the TMDB API key on the server.

Most page content is stored directly in the React components. The cinema features require the local TMDB proxy described below; the rest of the site can run without it.

## Requirements

- Node.js 20.19 or newer, or Node.js 22.12 or newer.
- npm (included with Node.js).

## Run Locally

From the project directory, install dependencies:

```bash
npm install
```

Create a `.env.local` file in the project root containing your TMDB API key:

```env
TMDB_API_KEY=your_tmdb_api_key
```

`.env.local` is ignored by Git. Keep the key server-side: do not add a `VITE_` prefix or commit the key.

Start the API proxy and Vite in separate terminals:

```bash
# Terminal 1
npm run dev:api
```

```bash
# Terminal 2
npm run dev
```

The API proxy listens on `http://localhost:3001`; Vite forwards `/api` requests to it. Open the local URL printed by Vite, usually `http://localhost:5173`.

The Vite proxy is for local development only. For production, [netlify.toml](./netlify.toml) publishes the build and rewrites `/api/tmdb` to a Netlify Function. In Netlify's site environment-variable settings, add `TMDB_API_KEY` with a scope that makes it available to Functions, then redeploy. Do not put the key in `netlify.toml` or expose it in the client bundle.

## Available Commands

```bash
npm run dev      # Start the local development server
npm run dev:api  # Start the local TMDB API proxy
npm run lint     # Check the project with ESLint
npm run build    # Create a production build in dist/
npm run preview  # Preview the production build locally
```

To preview the production version, run `npm run build` first, then `npm run preview`.

## How It Is Organized

The app is composed of page-level views and smaller reusable interface components. `App.jsx` sets up the routes and shared elements such as the navigation and background. Each page composes the components it needs, while Tailwind utilities and shared CSS classes provide the visual system and responsive behavior.

```text
src/
├── components/       # Navigation, hero, project cards, starfield, and shared UI
├── pages/            # Home, contacts, projects, and education pages
├── App.jsx           # Shared app layout and route definitions
├── App.css           # App-specific styles
├── index.css         # Tailwind setup and reusable styles
└── main.jsx          # React entry point
api/
├── tmdb.js           # Local Node.js proxy for TMDB requests
└── tmdbProxy.js      # Shared TMDB request handling
netlify/
└── functions/
    └── tmdb.js       # Production TMDB endpoint
netlify.toml          # Netlify build and API rewrite configuration
public/
└── cv.html           # CV page opened from the home page
```

Project and education entries are maintained in their respective page files, making it straightforward to update portfolio content without a content-management service.
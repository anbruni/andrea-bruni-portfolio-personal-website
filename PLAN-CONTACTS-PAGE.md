# 📋 Piano di Lavoro: Pagina Contacts con Routing

## 🎯 Obiettivo Sessione
Implementare navigazione multi-pagina con React Router e creare una pagina Contacts responsive e stilosa.

---

## 📚 Concetti React che imparerai oggi:

1. **React Router** - Navigazione client-side tra pagine
2. **Routes & Route** - Definire percorsi e componenti associati
3. **Link component** - Navigazione senza ricaricare la pagina
4. **useLocation hook** - Sapere quale pagina è attiva
5. **Layout patterns** - Componenti condivisi tra pagine
6. **Component composition** - Strutturare pagine complesse

---

## 🔧 FASE 1: Setup React Router (15 min)

### Concetto: Client-Side Routing

**Differenza tra routing tradizionale e React Router:**
- **Tradizionale:** Click link → ricarica pagina → server invia HTML nuovo
- **React Router:** Click link → JavaScript cambia componente → NO ricarica!

**Vantaggi:**
- ⚡ Velocità (no ricarica)
- ✨ Transizioni smooth
- 💾 State mantenuto tra pagine

---

### ✅ Step 1.1: Installare React Router

**Comando:**
```bash
npm install react-router-dom
```

**Cosa fa:** Aggiunge routing alla tua app React.

---

### ✅ Step 1.2: Capire i componenti principali

React Router ha 4 componenti fondamentali che lavorano insieme. Capiamoli uno per uno! 🧩

---

#### 📦 **`BrowserRouter`** - Il Provider del Routing

**Cos'è:**
- Un **context provider** che rende disponibile il routing a tutta l'app
- Usa HTML5 History API (`window.history.pushState`)
- Gestisce la sincronizzazione tra URL del browser e componenti React

**Dove va:**
Deve avvolgere TUTTA l'app in `main.jsx`, al livello più alto possibile.

**Perché in main.jsx?**
Tutti i componenti figli possono accedere al routing context (Link, useLocation, etc.)

**Esempio:**
```jsx
// main.jsx
<BrowserRouter>
  <App />  ← Tutto qui dentro può usare routing
</BrowserRouter>
```

**Analogia:** 
È come accendere il WiFi nel router: una volta acceso, tutti i device in casa possono connettersi. BrowserRouter "accende" il routing per tutta l'app.

**Alternative:**
- `HashRouter` - Usa `#` negli URL (es: `/#/contacts`) - più vecchio
- `MemoryRouter` - Per testing (URL non cambia nel browser)

Usiamo **BrowserRouter** perché produce URL puliti (`/contacts` invece di `/#/contacts`).

---

#### 🗂️ **`Routes`** - Il Contenitore delle Route

**Cos'è:**
- Container che gestisce QUALE route mostrare
- Valuta tutte le `<Route>` figlie e renderizza solo quella che matcha l'URL corrente
- Solo UNA route è attiva alla volta (esclusivo)

**Dove va:**
In `App.jsx`, dove vuoi che cambi il contenuto della pagina.

**Esempio:**
```jsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/contacts" element={<ContactsPage />} />
  <Route path="/about" element={<AboutPage />} />
</Routes>
```

**Come funziona:**
1. Utente visita `/contacts`
2. `Routes` confronta URL con tutti i `path`
3. Trova match: `path="/contacts"`
4. Renderizza solo `<ContactsPage />`
5. Gli altri componenti (HomePage, AboutPage) NON vengono renderizzati

**Analogia:**
È come un interruttore con 3 posizioni: puoi scegliere solo UNA posizione alla volta. Quando scegli "contacts", solo quello si accende.

**Importante:**
Componenti FUORI da `<Routes>` sono SEMPRE visibili (es: Navbar, Footer, Starfield).

---

#### 🛣️ **`Route`** - La Singola Route

**Cos'è:**
- Definisce una "regola": "Se URL è X, mostra componente Y"
- Ha due prop principali: `path` e `element`

**Props:**

**`path`** (stringa):
- Il percorso URL da matchare
- Esempi: `"/"`, `"/contacts"`, `"/blog/:id"` (con parametri)

**`element`** (JSX):
- Il componente da renderizzare quando path matcha
- DEVE essere JSX: `element={<ContactsPage />}` ✅
- NON stringa: `element="ContactsPage"` ❌
- NON solo il componente: `element={ContactsPage}` ❌

**Esempi:**
```jsx
{/* Homepage */}
<Route path="/" element={<HomePage />} />

{/* Pagina contacts */}
<Route path="/contacts" element={<ContactsPage />} />

{/* Route con parametro dinamico (futuro) */}
<Route path="/blog/:id" element={<BlogPost />} />

{/* Route non trovata (404) */}
<Route path="*" element={<NotFound />} />
```

**Matching:**
- `path="/"` matcha SOLO `http://localhost:5173/`
- `path="/contacts"` matcha SOLO `http://localhost:5173/contacts`
- `path="*"` matcha QUALSIASI URL (wildcard, usa per 404)

**Analogia:**
È come una voce nel menù di un ristorante:
```
Se ordini "Pizza" → Ricevi Pizza Margherita
Se ordini "Pasta" → Ricevi Spaghetti
```

---

#### 🔗 **`Link`** - Navigazione Senza Reload

**Cos'è:**
- Componente React che sostituisce `<a href>`
- Cambia URL SENZA ricaricare la pagina (client-side navigation)
- Aggiorna la route mostrata istantaneamente

**Differenza con `<a>`:**

**Con `<a>` (❌ tradizionale):**
```jsx
<a href="/contacts">Contact</a>
```
**Cosa succede:**
1. Click → Browser richiede `/contacts` al server
2. Pagina si ricarica completamente
3. JavaScript si reinizializza
4. State viene perso
5. **Lento** (richiesta network)

**Con `<Link>` (✅ React Router):**
```jsx
<Link to="/contacts">Contact</Link>
```
**Cosa succede:**
1. Click → React Router intercetta
2. Cambia URL con `pushState` (no reload!)
3. React renderizza nuovo componente
4. State mantenuto
5. **Veloce** (tutto in client)

**Props principali:**

**`to`** (stringa o oggetto):
- Dove navigare
- Esempi: `to="/"`, `to="/contacts"`, `to="/blog/123"`

**`className`** (stringa):
- Classi CSS per lo styling
- Esempio: `className="nav-link"`

**Esempi completi:**
```jsx
{/* Link semplice */}
<Link to="/contacts">Contact</Link>

{/* Link con classi Tailwind */}
<Link to="/contacts" className="nav-link hover:text-blue-500">
  Contact
</Link>

{/* Link che chiude menu mobile */}
<Link 
  to="/contacts" 
  onClick={() => setMenuOpen(false)}
>
  Contact
</Link>
```

**Rendered HTML:**
Link viene renderizzato come `<a>` nel DOM, ma con gestione eventi custom di React Router:
```html
<a href="/contacts" onclick="[React Router handler]">Contact</a>
```

**Quando usare `<Link>` vs `<a>`:**
- **`<Link>`** ✅ - Navigazione interna (pagine della tua app)
- **`<a>`** ✅ - Link esterni (es: `href="https://google.com"`)

**Analogia:**
`<a>` = Andare in un'altra città (devi preparare tutto, viaggio lungo)
`<Link>` = Cambiare stanza in casa (istantaneo, tutto è già pronto)

---

#### 🔄 **Come lavorano insieme:**

```jsx
// main.jsx
<BrowserRouter>  ← 1. Abilita routing globale
  <App />
</BrowserRouter>

// App.jsx
<div>
  <Navbar />  ← 2. Navbar usa <Link> per navigare
  
  <Routes>  ← 3. Routes decide quale mostrare
    <Route path="/" element={<HomePage />} />
    <Route path="/contacts" element={<ContactsPage />} />
  </Routes>
</div>

// Navbar.jsx
<Link to="/contacts">Contact</Link>  ← 4. Click cambia URL
```

**Flow completo:**
1. User clicca `<Link to="/contacts">`
2. React Router cambia URL a `/contacts` (no reload)
3. `<Routes>` vede URL cambiato
4. Confronta con tutti i `<Route>`
5. Trova match: `<Route path="/contacts">`
6. Renderizza `<ContactsPage />`
7. Navbar e Starfield rimangono visibili (fuori da Routes)

---

#### 📊 **Diagramma Visivo:**

```
BrowserRouter (Wrapper globale)
    ↓
  App.jsx
    ├── Starfield (sempre visibile)
    ├── Navbar (sempre visibile)
    │     └── Link to="/" 
    │     └── Link to="/contacts"
    │
    └── Routes (contenitore dinamico)
          ├── Route path="/" → HomePage ✅ (quando URL = /)
          └── Route path="/contacts" → ContactsPage ✅ (quando URL = /contacts)
```

---

**Ora hai capito tutti i pezzi fondamentali! Passiamo all'implementazione.** 🚀

---

### ✅ Step 1.3: Modificare main.jsx

**File:** `src/main.jsx`

**Cosa fare:**
1. Importa `BrowserRouter` da `'react-router-dom'`
2. Avvolgi `<App />` con `<BrowserRouter>`

**Struttura:**
```jsx
import { BrowserRouter } from 'react-router-dom'

<BrowserRouter>
  <App />
</BrowserRouter>
```

**Perché:** BrowserRouter deve avvolgere TUTTA l'app per dare accesso al routing a tutti i componenti.

---

## 🏗️ FASE 2: Configurare Routes in App.jsx (20 min)

### Concetto: Struttura delle Routes

**Pattern comune:**
```
App
├── Layout condiviso (Navbar, Starfield)
├── Routes
    ├── Route / → HomePage
    └── Route /contacts → ContactsPage
```

---

### ✅ Step 2.1: Creare componente HomePage

**File:** `src/pages/HomePage.jsx` (nuova cartella!)

**Cosa fare:**
1. Crea cartella `src/pages/`
2. Crea file `HomePage.jsx`
3. Sposta la logica della Hero section qui

**Struttura:**
```jsx
import Hero from '../components/Hero';

function HomePage() {
  return (
    <div className="flex items-center justify-center h-screen relative z-10">
      <Hero />
    </div>
  );
}

export default HomePage;
```

**Perché:** Separare "pagine" da "componenti riutilizzabili". HomePage è una pagina specifica, Hero è un componente riutilizzabile.

---

### ✅ Step 2.2: Refactorare App.jsx

**Cosa fare in App.jsx:**

1. **Importa componenti routing:**
```jsx
import { Routes, Route } from 'react-router-dom';
```

2. **Importa le pagine:**
```jsx
import HomePage from './pages/HomePage';
import ContactsPage from './pages/ContactsPage';
```

3. **Nuova struttura return:**
```jsx
return (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
    <Starfield />
    <Navbar />
    
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contacts" element={<ContactsPage />} />
    </Routes>
  </div>
);
```

**Perché `element={}`?** 
React Router v6 usa `element` prop. Devi passare JSX: `element={<HomePage />}`.

---

### ✅ Step 2.3: Aggiornare Navbar

**File:** `src/components/Navbar.jsx`

**Cosa cambiare:**

1. **Import Link:**
```jsx
import { Link } from 'react-router-dom';
```

2. **Sostituisci `<a>` con `<Link>`:**
```jsx
// Prima:
<a href="#contact" className="nav-link">Contact</a>

// Dopo:
<Link to="/contacts" className="nav-link">Contact</Link>
```

3. **Fai lo stesso per tutti i link** (desktop e mobile)

4. **Mobile menu:** Mantieni `onClick={() => setIsMenuOpen(false)}` per chiuderlo

**Perché Link invece di <a>?**
- `<a>` ricarica la pagina (lento, perde state)
- `<Link>` usa pushState (veloce, smooth, mantiene state)

---

## 🎨 FASE 3: Creare ContactsPage Component (30 min)

### Concetto: Layout della pagina

**Struttura ContactsPage:**
```
Container (full height, centered)
  ↓
  Heading (titolo principale)
  ↓
  Contact Cards Grid (responsive)
    ├── Phone Card
    ├── Email Card  
    ├── LinkedIn Card
    └── GitHub Card
```

---

### ✅ Step 3.1: Creare file skeleton

**File:** `src/pages/ContactsPage.jsx`

**Struttura base:**
```jsx
function ContactsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative z-10">
      <h1 className="heading-1 mb-12">Get In Touch</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        {/* Cards qui */}
      </div>
    </div>
  );
}

export default ContactsPage;
```

---

### ✅ Step 3.2: Capire le classi del Container

**Classi Tailwind per container principale:**
- `min-h-screen` - Altezza minima schermo intero
- `flex flex-col` - Layout verticale (colonna)
- `items-center justify-center` - Centra tutto
- `px-4 py-16` - Padding responsive
- `relative z-10` - Sopra lo starfield

**Perché relative z-10?** 
Starfield ha `z-0`, quindi contenuto deve essere `z-10` per stare sopra.

---

### ✅ Step 3.3: Grid di contatti

**Classi per grid:**
```
grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full
```

**Cosa significano:**
- `grid` - Abilita CSS Grid
- `grid-cols-1` - Default 1 colonna (mobile)
- `md:grid-cols-2` - 2 colonne da 768px in su (tablet/desktop)
- `gap-6` - Spazio tra card (1.5rem = 24px)
- `max-w-4xl` - Larghezza massima (896px)
- `w-full` - 100% larghezza fino al max

---

### ✅ Step 3.4: Creare Contact Card component

**Ogni card deve avere:**

1. **Container `<a>`** (link cliccabile)
2. **Icon** (da lucide-react)
3. **Label** (tipo: "Phone", "Email")
4. **Value** (il tuo dato reale)

**Classi per card:**
```
bg-white/10 backdrop-blur-sm rounded-xl p-6 
hover:scale-105 transition-transform duration-200
flex items-center gap-4 cursor-pointer
```

**Cosa sono:**
- `bg-white/10` - Bianco al 10% opacità (sfondo semi-trasparente)
- `backdrop-blur-sm` - Effetto blur dello sfondo
- `rounded-xl` - Bordi molto arrotondati
- `hover:scale-105` - Ingrandisce al 5% on hover
- `transition-transform` - Animazione smooth
- `flex items-center gap-4` - Layout orizzontale icona + testo

---

### ✅ Step 3.5: Usare Lucide Icons

**Import in ContactsPage.jsx:**
```jsx
import { Phone, Mail, Linkedin, Github } from 'lucide-react';
```

**Uso icona:**
```jsx
<Phone size={24} className="text-french-blue" />
```

**Props disponibili:**
- `size={number}` - Dimensione in pixel
- `className` - Classi Tailwind per colore/stile
- `strokeWidth={number}` - Spessore linee (default 2)

---

### ✅ Step 3.6: Esempio Card Phone

**Struttura completa card telefono:**

```jsx
<a 
  href="tel:+393401234567" 
  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:scale-105 transition-transform duration-200 flex items-center gap-4 cursor-pointer"
>
  <Phone size={24} className="text-french-blue" />
  <div className="flex flex-col">
    <span className="text-slate-400 text-sm">Phone</span>
    <span className="text-white font-medium">+39 340 123 4567</span>
  </div>
</a>
```

**Tipi di link per ogni card:**
- **Phone:** `href="tel:+393401234567"`
- **Email:** `href="mailto:tua@email.com"`
- **LinkedIn:** `href="https://linkedin.com/in/tuoprofilo"` + `target="_blank"` + `rel="noopener noreferrer"`
- **GitHub:** `href="https://github.com/tuousername"` + `target="_blank"` + `rel="noopener noreferrer"`

**Perché `rel="noopener noreferrer"`?**
- `noopener` - Previene accesso alla finestra parent (sicurezza)
- `noreferrer` - Non invia referrer header (privacy)

---

### ✅ Step 3.7: Creare tutte le 4 cards

**Duplica la struttura per:**
1. Phone Card
2. Email Card
3. LinkedIn Card
4. GitHub Card

**Cambia per ogni card:**
- Icon component (`<Phone>`, `<Mail>`, `<Linkedin>`, `<Github>`)
- href value
- Label text
- Value text
- Aggiungi `target="_blank" rel="noopener noreferrer"` per LinkedIn/GitHub

---

## 🎨 FASE 4: Styling e Polish (15 min)

### ✅ Step 4.1: Active link in Navbar

**Concetto:** Highlight link della pagina corrente

**Hook da usare:** `useLocation` da react-router-dom

**In Navbar.jsx:**

1. **Import:**
```jsx
import { Link, useLocation } from 'react-router-dom';
```

2. **Usa hook:**
```jsx
const location = useLocation();
```

3. **Check se attivo:**
```jsx
const isContactsActive = location.pathname === '/contacts';
```

4. **Applica classe condizionale:**
```jsx
<Link 
  to="/contacts" 
  className={`nav-link ${isContactsActive ? 'text-french-blue font-semibold' : ''}`}
>
  Contact
</Link>
```

**Cosa fa `location.pathname`?**
Ritorna il path corrente (es: "/" o "/contacts")

---

### ✅ Step 4.2: Responsive testing

**Testa su:**
- Mobile (375px) - cards impilate verticalmente
- Tablet (768px) - 2 colonne iniziano
- Desktop (1280px) - 2 colonne ben spaziate

**Controlla:**
- [ ] Cards ben allineate
- [ ] Testo leggibile
- [ ] Icons visibili
- [ ] Hover effects funzionanti
- [ ] Padding corretto

---

## ✅ FASE 5: Testing Completo (10 min)

### Checklist finale:

**Navigazione:**
- [ ] Click su "Contact" nel navbar va a `/contacts`
- [ ] URL nel browser cambia correttamente
- [ ] Navbar presente su entrambe le pagine
- [ ] Starfield visibile su entrambe
- [ ] Back button del browser funziona
- [ ] Link "Contact" highlighted quando sei su `/contacts`

**Design:**
- [ ] ContactsPage centrata verticalmente
- [ ] Heading ben visibile
- [ ] Cards responsive (1 col mobile, 2 col tablet+)
- [ ] Cards ben spaziate
- [ ] Icons colorate (French Blue)
- [ ] Hover effects smooth
- [ ] Testo leggibile su sfondo scuro

**Funzionalità:**
- [ ] Link email apre client email
- [ ] Link telefono apre dialer (mobile)
- [ ] LinkedIn apre profilo in nuova tab
- [ ] GitHub apre profilo in nuova tab
- [ ] Tutte le cards cliccabili

---

## 📝 Ordine di implementazione consigliato:

1. ✅ `npm install react-router-dom`
2. ✅ Modifica `main.jsx` → BrowserRouter
3. ✅ Crea `src/pages/HomePage.jsx`
4. ✅ Refactora `App.jsx` → Routes & Route
5. ✅ Aggiorna `Navbar.jsx` → Link instead of <a>
6. ✅ Crea `src/pages/ContactsPage.jsx` skeleton
7. ✅ Aggiungi heading in ContactsPage
8. ✅ Crea grid container
9. ✅ Implementa Phone card
10. ✅ Implementa Email card
11. ✅ Implementa LinkedIn card
12. ✅ Implementa GitHub card
13. ✅ Testa navigazione completa
14. ✅ Aggiungi active state in navbar (useLocation)
15. ✅ Test responsive finale

---

## 🎓 Concetti chiave da ricordare:

**React Router:**
- `BrowserRouter` = wrapper globale (va in main.jsx)
- `Routes` = contenitore di tutte le route
- `Route` = path → component mapping
- `Link` = navigazione senza reload
- `useLocation` = hook per sapere path corrente

**Component organization:**
- `pages/` = componenti "pagina" (HomePage, ContactsPage)
- `components/` = componenti riutilizzabili (Hero, Navbar, Button)

**Responsive Grid:**
- `grid-cols-1` = 1 colonna mobile
- `md:grid-cols-2` = 2 colonne tablet+
- `gap` = spazio tra elementi

**Links esterni:**
- `target="_blank"` = apre in nuova tab
- `rel="noopener noreferrer"` = sicurezza e privacy

---

## 🚀 Prossimi Step (Sessione Futura):

- Sezione "Scrivimi" con form
- Validazione input
- Invio email con EmailJS
- Loading states
- Success/Error messages

---

**Iniziamo! Esegui `npm install react-router-dom` e dimmi quando è pronto!** 🎯

# Plan: ProjectCard interattiva — hover glow + modal preview

**Cosa costruiremo:** ogni carta reagisce all'hover con un effetto luminoso, e cliccandola si apre una finestra sovrapposta (modal) con uno screenshot del progetto e un testo breve.

---

## Fase 1 — Preparare i dati e gli asset

**Step 1 — Aggiungere lo screenshot al progetto**
Fai uno screenshot del sito bouldergarage.it (intera pagina o solo hero), salvalo in `public/` con un nome pulito tipo `boulder-garage-preview.jpg`.

*Perché `public/`?* Tutto ciò che metti in `public/` viene servito da Vite direttamente come file statico. Per referenziarlo nel codice usi il path `/boulder-garage-preview.jpg` — nessun import necessario.

**Step 2 — Aggiungere i campi `screenshot` e `previewText` all'oggetto progetto in `WorkAndProjects.jsx`**
Aggiungi due nuovi campi nel data object: `screenshot` (path dell'immagine) e `previewText` (un testo breve, 1-2 righe).

---

## Fase 2 — Hover glow sulla carta

**Step 3 — Capire come funziona hover con Tailwind**
Tailwind usa il prefisso `hover:` per applicare stili al mouseover, es. `hover:shadow-lg`. Per un effetto glow si usa `hover:shadow-[0_0_30px_rgba(...)]` con valori custom in parentesi quadre — questa è la sintassi JIT di Tailwind per valori arbitrari.

**Step 4 — Aggiungere il glow alla carta in `ProjectCard.jsx`**
Sul `div` principale della carta aggiungi:
- `transition-all duration-300` → abilita la transizione CSS su tutte le proprietà modificate
- `hover:shadow-[0_0_40px_rgba(99,102,241,0.3)]` → glow viola/indaco (puoi cambiare il colore)
- `hover:-translate-y-1` → leggero lift verso l'alto
- `cursor-pointer` → indica che è cliccabile

*Perché `transition-all duration-300`?* Senza questa classe il cambio di stile sarebbe istantaneo. `transition-all` dice al browser di animare tutte le proprietà che cambiano, `duration-300` imposta la durata a 300ms.

---

## Fase 3 — Stato aperto/chiuso con `useState`

**Step 5 — Capire `useState`**
`useState` è un hook React che permette a un componente di "ricordare" un valore tra un render e l'altro. Dichiari: `const [isOpen, setIsOpen] = useState(false)`. `isOpen` è il valore attuale, `setIsOpen` è la funzione per aggiornarlo. Ogni volta che chiami `setIsOpen(true)`, React ri-renderizza il componente con il nuovo valore.

**Step 6 — Aggiungere `useState` a `ProjectCard`**
Importa `useState` da React. Dichiara lo stato `isOpen`. Aggiungi `onClick={() => setIsOpen(true)}` al `div` principale della carta.

---

## Fase 4 — Creare il componente `ProjectModal`

**Step 7 — Creare il file `src/components/ProjectModal.jsx`**
Questo componente riceve via props: `screenshot`, `title`, `previewText`, `liveUrl`, `onClose`. Renderizza:
- Un **overlay scuro** che copre tutto lo schermo (`fixed inset-0 bg-black/70 backdrop-blur-sm z-50`)
- Una **finestra centrata** con l'immagine, il titolo, il testo e un link "Visit site"
- Un **pulsante X** in alto a destra che chiama `onClose`

*Perché `fixed inset-0`?* `fixed` toglie l'elemento dal flusso normale e lo posiziona rispetto alla viewport. `inset-0` è shorthand per `top:0 right:0 bottom:0 left:0` — copre tutto lo schermo.

**Step 8 — Capire il rendering condizionale**
In JSX puoi usare `{isOpen && <ProjectModal ... />}` per mostrare il modal solo quando `isOpen` è `true`. Quando `isOpen` diventa `false`, React rimuove il componente dal DOM.

**Step 9 — Usare `ProjectModal` in `ProjectCard`**
Importa `ProjectModal` in `ProjectCard`. Aggiungilo nel JSX con rendering condizionale, passando tutte le props e `onClose={() => setIsOpen(false)}`.

---

## Fase 5 — Chiusura con tasto Escape

**Step 10 — Capire `useEffect`**
`useEffect` esegue del codice come "effetto collaterale" dopo il render. Accetta due argomenti: una funzione e un array di dipendenze. Se le dipendenze cambiano, l'effetto viene rieseguito. La funzione può restituire un "cleanup" che viene chiamato quando il componente viene smontato — fondamentale per rimuovere event listener.

**Step 11 — Aggiungere la chiusura con Escape in `ProjectModal`**
Usa `useEffect` per aggiungere un listener su `keydown`. Se il tasto premuto è `'Escape'`, chiama `onClose`. Nel cleanup, rimuovi il listener con `removeEventListener`.

*Perché il cleanup?* Se non rimuovi il listener quando il modal si chiude, continuerà ad esistere in memoria anche quando il componente non è più nel DOM — questo si chiama memory leak.

---

## Fase 6 — Chiudere cliccando l'overlay

**Step 12 — Capire `event.stopPropagation()`**
Quando clicchi sulla finestra interna del modal, l'evento "risale" (bubble) fino all'overlay e chiuderebbe il modal involontariamente. `e.stopPropagation()` blocca questa risalita. Aggiungi `onClick={e => e.stopPropagation()}` sul div della finestra interna, e `onClick={onClose}` sull'overlay esterno.

---

## Verifica finale
- Hover sulla carta → vedi glow e lift
- Click sulla carta → si apre il modal con screenshot
- Click sull'overlay o X → si chiude
- Premi Escape → si chiude
- Su mobile → tutto funziona (la foto scala correttamente)

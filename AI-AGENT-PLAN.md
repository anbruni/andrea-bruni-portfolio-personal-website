# AI Agent — "Parla al posto mio" 🤖

## Obiettivo
Un chatbot integrato nel portfolio che risponde alle domande dei visitatori come se fosse me.
Deve poter comunicare opportunità e messaggi importanti a me in tempo reale.

---

## Stack Tecnico

| Componente | Tecnologia | Note |
|---|---|---|
| LLM | **Groq API** | Gratis, velocissimo, Llama 3.3 70B |
| Backend | **Node.js + Express** o Next.js API routes | Gestisce le chiamate all'API |
| Frontend | **React** (già esistente) | Chat UI integrata nel portfolio |
| Streaming | **Vercel AI SDK** o fetch SSE | Effetto "typing" in tempo reale |
| Notifiche | **Telegram Bot** o email | Mi avvisa se qualcuno è interessante |

---

## Funzionalità

### MVP (prima versione)
- [ ] Chat UI nella pagina Contacts (rimpiazza "Coming Soon")
- [ ] Il bot risponde come me (personalità, tono, competenze)
- [ ] Streaming delle risposte (effetto typing)
- [ ] Storico della conversazione nella sessione

### Fase 2
- [ ] Notifica a me quando qualcuno fa domande su opportunità di lavoro
- [ ] Rate limiting per evitare abusi
- [ ] Guardrails (cosa il bot NON deve dire)

### Fase 3 (nice to have)
- [ ] Memoria persistente tra sessioni (database)
- [ ] Il bot può raccogliere il contatto del visitatore
- [ ] Analytics: domande più frequenti

---

## System Prompt (da costruire)

Il cuore del bot. Deve essere costruito a partire dalla knowledge base interna:

- Fonte primaria: [AI-AGENT-KNOWLEDGE-BASE.md](AI-AGENT-KNOWLEDGE-BASE.md)
- Usare solo informazioni marcate come `Verified`
- Non presentare come fatti le sezioni `Needs confirmation`
- Se un'informazione non e' nella knowledge base, il bot deve dichiarare che non e' confermata e invitare a contattarmi direttamente
- Il bot deve essere trasparente: e' un assistente AI del portfolio, non Andrea in persona

Deve includere:
- Chi sono, cosa faccio, dove vivo
- Stack tecnologico e anni di esperienza, solo quando verificati
- Disponibilita' per lavoro e collaborazioni, solo quando aggiornata nella knowledge base
- Tono di voce: amichevole, diretto, professionale, pratico
- Guardrails: cosa il bot NON deve dire, inclusi dati privati, dettagli confidenziali, prezzi, salario, contratti e informazioni non confermate
- FAQ con risposte predefinite derivate dalla knowledge base

---

## Architettura

```
Visitatore → Chat UI (React)
                 ↓
           Backend API (Node/Express)
                 ↓
           Groq API (Llama 3.3)
                 ↓
           Risposta in streaming → Chat UI
                 ↓ (se parola chiave trovata)
           Notifica → Telegram/Email → Me
```

---

## Perché è un progetto interessante
- Dimostra conoscenza di **LLM e AI APIs**
- Dimostra integrazione **frontend + backend**
- Caso d'uso reale e originale nel portfolio
- Completamente **gratuito** con Groq free tier

---

## Note
- Groq API: https://console.groq.com
- Modello consigliato: `llama-3.3-70b-versatile`
- Limite free tier: ~14.400 richieste/giorno (più che sufficiente per un portfolio)

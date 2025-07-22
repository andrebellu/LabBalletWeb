# Lab Ballet - Sito ufficiale

Sito web ufficiale della scuola di danza **LabBallet**, sviluppato con [Svelte](https://svelte.dev/), [Tailwind CSS](https://tailwindcss.com/) e [Vite](https://vitejs.dev/).

## Struttura del progetto

```
LabBalletWeb/
├── src/              # Codice sorgente Svelte
│   ├── routes/       # Pagine del sito
│   ├── lib/          # Componenti riutilizzabili
│   └── app.html      # Entry point
├── static/           # File statici (immagini, favicon, ecc.)
├── tailwind.config.cjs
├── svelte.config.js
├── vite.config.js
├── package.json
└── README.md
```

## Come avviare il progetto in locale

### 1. Clona la repository

```bash
git clone https://github.com/andrebellu/LabBalletWeb.git
cd LabBalletWeb
```

### 2. Installa le dipendenze

```bash
yarn install
```

### 3. Avvia il server di sviluppo

```bash
yarn dev
```

Il sito sarà accessibile su `http://localhost:5173`.

## Tecnologie usate

- **[Svelte](https://svelte.dev/)** – Framework JavaScript reattivo e leggero
- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first CSS framework
  - **[DaisyUI](https://daisyui.com/)** – Componenti UI per Tailwind
- **[Vite](https://vitejs.dev/)** – Build tool e dev server ultra-veloce
- **Yarn** – Gestore di pacchetti

# EHUB Knights Basketball

> Presenting the Philippines Basketball Community on the Central Coast, NSW.

Live site: **https://camwow9.github.io/website-demo-ehubbasketball/**

---

## Stack

- React 18
- Vite 5
- Deployed via GitHub Pages (`gh-pages`)

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:5173/website-demo-ehubbasketball/

## Deploy to GitHub Pages

```bash
npm run deploy
```

This runs `vite build` then pushes the `dist/` folder to the `gh-pages` branch automatically.

## Project Structure

```
ehub-knights/
├── public/
│   ├── EHUB_logo_2.jpg      ← Main logo (add manually)
│   ├── EHUB_logo.jpg        ← Original logo (add manually)
│   └── favicon.svg
├── src/
│   ├── App.jsx              ← Full website component
│   └── main.jsx             ← React entry point
├── index.html
├── vite.config.js
└── package.json
```

## Adding Your Logos

Copy both logo images into the `public/` folder:
- `public/EHUB_logo_2.jpg`
- `public/EHUB_logo.jpg`

---

🇵🇭 Filipino Pride · Central Coast Strong 🏀

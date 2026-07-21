# Font Pair Generator
Pick a heading typeface and instantly get body fonts that pair beautifully — with a live, editable preview and copy-paste CSS.

---

## Live Demo
https://font-pair-generator.vercel.app/

---

## Features
- **19 curated Google Fonts** across serif, sans, and display categories
- **Pairing engine** — choose a heading and get contrast-matched body suggestions automatically
- **Live editable preview** — type your own heading + paragraph and watch both fonts render in real time
- **8 curated pairings** with named vibes (Editorial, Modern Tech, Luxury, Bold Poster…)
- **Surprise me** shuffles a hand-picked combination in one click
- **Size scale slider** to preview typography at different scales
- **One-click export** — copy the Google Fonts `<link>` and ready-to-use CSS
- Fully keyboard-navigable, Apple-inspired dark UI

---

## Tech Stack
- React 19 (Vite)
- CSS custom properties (Apple-inspired dark UI, no framework)
- Google Fonts (loaded once via a single `<link>`)

---

## How It Works
1. Choose a **heading font** — the engine suggests body companions based on type contrast (serif/display headings get clean sans bodies, sans headings get serif or humanist bodies).
2. Tap a suggested body or browse curated pairings.
3. Edit the preview text, tweak the size, then copy the `<link>` + CSS into your project.

> Everything runs entirely in your browser. No data leaves your machine.

---

## Installation
```bash
git clone https://github.com/berkinyilmaz/font-pair-generator.git
cd font-pair-generator
npm install
npm run dev
```

---

## Privacy
Everything runs **locally in your browser**.
# font-pair-generator

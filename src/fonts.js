// Curated Google Fonts library. Every font here is loaded via the <link> in index.html.
// category: 'serif' | 'sans' | 'display'  —  drives the pairing engine (contrast rules)
// mood: informal tag used for suggestion labels
export const FONTS = [
  { name: 'Inter',            stack: "'Inter', sans-serif",            category: 'sans',    mood: 'neutral',    weights: [400, 500, 600], head: 600, body: 400 },
  { name: 'Playfair Display', stack: "'Playfair Display', serif",     category: 'serif',   mood: 'elegant',    weights: [400, 500, 700], head: 700, body: 400 },
  { name: 'DM Serif Display', stack: "'DM Serif Display', serif",     category: 'serif',   mood: 'editorial',  weights: [400],           head: 400, body: 400 },
  { name: 'Cormorant',        stack: "'Cormorant', serif",           category: 'serif',   mood: 'refined',    weights: [400, 500, 600], head: 600, body: 400 },
  { name: 'Lora',             stack: "'Lora', serif",                category: 'serif',   mood: 'contemporary', weights: [400, 500, 600], head: 600, body: 400 },
  { name: 'Merriweather',     stack: "'Merriweather', serif",        category: 'serif',   mood: 'readable',   weights: [400, 700],      head: 700, body: 400 },
  { name: 'PT Serif',         stack: "'PT Serif', serif",            category: 'serif',   mood: 'classic',    weights: [400, 700],      head: 700, body: 400 },
  { name: 'Libre Baskerville',stack: "'Libre Baskerville', serif",   category: 'serif',   mood: 'traditional',weights: [400, 700],      head: 700, body: 400 },
  { name: 'Poppins',          stack: "'Poppins', sans-serif",        category: 'sans',    mood: 'geometric',  weights: [400, 500, 600], head: 600, body: 400 },
  { name: 'Montserrat',       stack: "'Montserrat', sans-serif",     category: 'sans',    mood: 'modern',     weights: [400, 500, 700], head: 700, body: 400 },
  { name: 'Space Grotesk',    stack: "'Space Grotesk', sans-serif",  category: 'sans',    mood: 'technical',  weights: [400, 500, 700], head: 700, body: 400 },
  { name: 'Sora',             stack: "'Sora', sans-serif",           category: 'sans',    mood: 'futuristic', weights: [400, 500, 700], head: 700, body: 400 },
  { name: 'Archivo',          stack: "'Archivo', sans-serif",        category: 'sans',    mood: 'grotesque',  weights: [400, 500, 700], head: 700, body: 400 },
  { name: 'Work Sans',        stack: "'Work Sans', sans-serif",      category: 'sans',    mood: 'clean',      weights: [400, 500, 600], head: 600, body: 400 },
  { name: 'Source Sans 3',    stack: "'Source Sans 3', sans-serif",  category: 'sans',    mood: 'humanist',   weights: [400, 500, 600], head: 600, body: 400 },
  { name: 'Lato',             stack: "'Lato', sans-serif",           category: 'sans',    mood: 'friendly',   weights: [400, 700],      head: 700, body: 400 },
  { name: 'Karla',            stack: "'Karla', sans-serif",          category: 'sans',    mood: 'quirky',     weights: [400, 500, 700], head: 700, body: 400 },
  { name: 'Oswald',           stack: "'Oswald', sans-serif",         category: 'display', mood: 'condensed',  weights: [400, 500, 600], head: 600, body: 400 },
  { name: 'Bebas Neue',       stack: "'Bebas Neue', sans-serif",     category: 'display', mood: 'bold',       weights: [400],           head: 400, body: 400 },
]

export const FONT_MAP = Object.fromEntries(FONTS.map((f) => [f.name, f]))

// Preferred body companions per heading — the "engine": display/serif headings crave a
// clean sans body, sans headings look sharp over a serif or a humanist sans body.
const BODY_POOL = {
  serif:   ['Inter', 'Source Sans 3', 'Work Sans', 'Karla', 'Lato', 'Montserrat'],
  display: ['Inter', 'Work Sans', 'Source Sans 3', 'Lato', 'Karla'],
  sans:    ['Lora', 'Merriweather', 'PT Serif', 'Inter', 'Source Sans 3', 'Karla'],
}

// Return up to `n` body-font suggestions for a given heading font, best contrast first.
export function suggestBodies(headingName, n = 4) {
  const head = FONT_MAP[headingName]
  if (!head) return []
  const pool = BODY_POOL[head.category] || BODY_POOL.sans
  return pool.filter((name) => name !== headingName).slice(0, n)
}

// Hand-picked showcase pairings with a named vibe.
export const CURATED = [
  { heading: 'Playfair Display', body: 'Source Sans 3', label: 'Editorial' },
  { heading: 'Space Grotesk',    body: 'Inter',         label: 'Modern Tech' },
  { heading: 'Montserrat',       body: 'Merriweather',  label: 'Corporate' },
  { heading: 'Oswald',           body: 'Lora',          label: 'Magazine' },
  { heading: 'DM Serif Display', body: 'Karla',         label: 'Elegant' },
  { heading: 'Bebas Neue',       body: 'Work Sans',     label: 'Bold Poster' },
  { heading: 'Cormorant',        body: 'Montserrat',    label: 'Luxury' },
  { heading: 'Archivo',          body: 'PT Serif',      label: 'Contemporary' },
]

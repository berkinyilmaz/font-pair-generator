import { useState, useMemo, useCallback } from 'react'
import { FONTS, FONT_MAP, CURATED, suggestBodies } from './fonts.js'
import './styles.css'

const DEFAULT_HEADING = 'Sovereignty is not given, it is taken.'
const DEFAULT_BODY =
  'Peace at home, peace in the world. A nation devoid of art and artists cannot have a full existence. The truest guide in life is knowledge and science; those who seek anything other than these are deceiving themselves.'
const ATTRIBUTION = 'Mustafa Kemal Atatürk'

function IconShuffle() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 4l3 3-3 3" /><path d="M18 20l3-3-3-3" />
      <path d="M3 7h3.5c1.5 0 2.5 1 3.5 2.5" /><path d="M21 7h-5.5c-2 0-3 2-4.5 4.5S8 17 6 17H3" /><path d="M21 17h-3" />
    </svg>
  )
}
function IconCopy() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}
function IconCheck() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

function FontSelect({ label, value, onChange, id }) {
  return (
    <div className="field">
      <label className="section-label" htmlFor={id}>{label}</label>
      <div className="select-wrap">
        <select id={id} className="font-select" value={value} onChange={(e) => onChange(e.target.value)} aria-label={label}>
          {FONTS.map((f) => (
            <option key={f.name} value={f.name}>{f.name} · {f.category}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

function CopyButton({ text, children, className = 'btn-copy' }) {
  const [copied, setCopied] = useState(false)
  const onCopy = useCallback(() => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    })
  }, [text])
  return (
    <button className={`${className}${copied ? ' copied' : ''}`} onClick={onCopy} aria-label="Copy to clipboard">
      {copied ? <IconCheck /> : <IconCopy />}
      {copied ? 'Copied' : children}
    </button>
  )
}

export default function App() {
  const [heading, setHeading] = useState('Playfair Display')
  const [body, setBody] = useState('Source Sans 3')
  const [scale, setScale] = useState(1)
  const [headText, setHeadText] = useState(DEFAULT_HEADING)
  const [bodyText, setBodyText] = useState(DEFAULT_BODY)

  const headFont = FONT_MAP[heading]
  const bodyFont = FONT_MAP[body]

  const suggestions = useMemo(() => suggestBodies(heading, 4), [heading])

  // When the heading changes, snap the body to the best suggestion if the current
  // one isn't already a recommended companion.
  const applyHeading = useCallback((name) => {
    setHeading(name)
    const picks = suggestBodies(name, 4)
    if (picks.length && !picks.includes(body)) setBody(picks[0])
  }, [body])

  const shuffle = useCallback(() => {
    const h = CURATED[Math.floor(Math.random() * CURATED.length)]
    setHeading(h.heading)
    setBody(h.body)
  }, [])

  const cssSnippet = useMemo(() => {
    return [
      `/* Heading */`,
      `h1, h2, h3 {`,
      `  font-family: ${headFont.stack};`,
      `  font-weight: ${headFont.head};`,
      `}`,
      ``,
      `/* Body */`,
      `body, p {`,
      `  font-family: ${bodyFont.stack};`,
      `  font-weight: ${bodyFont.body};`,
      `}`,
    ].join('\n')
  }, [headFont, bodyFont])

  const linkSnippet = useMemo(() => {
    const fam = (f) => f.name.replace(/ /g, '+') + (f.weights.length > 1 ? `:wght@${f.weights.join(';')}` : '')
    return `<link href="https://fonts.googleapis.com/css2?family=${fam(headFont)}&family=${fam(bodyFont)}&display=swap" rel="stylesheet">`
  }, [headFont, bodyFont])

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="header-left">
            <div>
              <h1 className="header-title">Font Pair Generator</h1>
              <p className="header-sub">Find heading + body typefaces that just work</p>
            </div>
          </div>
          <div className="header-right">
            <button className="btn-now" onClick={shuffle} aria-label="Shuffle a curated pairing">
              <IconShuffle /> Surprise me
            </button>
          </div>
        </div>
      </header>

      <main className="main">
        {/* ── Controls ─────────────────────────────── */}
        <section className="controls-card">
          <div className="controls-grid">
            <FontSelect id="heading-font" label="Heading font" value={heading} onChange={applyHeading} />
            <FontSelect id="body-font" label="Body font" value={body} onChange={setBody} />
          </div>

          <div className="suggest-row">
            <span className="suggest-caption">Suggested bodies</span>
            <div className="chips">
              {suggestions.map((name) => (
                <button
                  key={name}
                  className={`chip${name === body ? ' active' : ''}`}
                  onClick={() => setBody(name)}
                  style={{ fontFamily: FONT_MAP[name].stack }}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <div className="scale-row">
            <span className="scale-label">Size</span>
            <input
              className="scale-slider"
              type="range"
              min="0.8"
              max="1.4"
              step="0.05"
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              aria-label="Preview size scale"
            />
            <span className="scale-value">{Math.round(scale * 100)}%</span>
          </div>
        </section>

        {/* ── Live Preview ─────────────────────────── */}
        <section className="preview-card">
          <div className="preview-meta">
            <span className="preview-tag">
              <span className="dot" />
              {headFont.name} <span className="preview-x">+</span> {bodyFont.name}
            </span>
            <span className="preview-hint">Text below is editable</span>
          </div>

          <input
            className="preview-heading"
            value={headText}
            onChange={(e) => setHeadText(e.target.value)}
            style={{ fontFamily: headFont.stack, fontWeight: headFont.head, fontSize: `calc(2.6rem * ${scale})` }}
            aria-label="Heading preview text"
            spellCheck={false}
          />
          <textarea
            className="preview-body"
            value={bodyText}
            onChange={(e) => setBodyText(e.target.value)}
            rows={4}
            style={{ fontFamily: bodyFont.stack, fontWeight: bodyFont.body, fontSize: `calc(1.0625rem * ${scale})` }}
            aria-label="Body preview text"
            spellCheck={false}
          />
          <span
            className="preview-attribution"
            style={{ fontFamily: bodyFont.stack, fontWeight: bodyFont.body, fontSize: `calc(0.8125rem * ${scale})` }}
          >
            — {ATTRIBUTION}
          </span>
        </section>

        {/* ── Curated pairings ─────────────────────── */}
        <section className="block">
          <div className="block-head">
            <span className="section-label">Curated pairings</span>
          </div>
          <div className="curated-grid">
            {CURATED.map((p) => {
              const active = p.heading === heading && p.body === body
              return (
                <button
                  key={p.label}
                  className={`curated-card${active ? ' active' : ''}`}
                  onClick={() => { setHeading(p.heading); setBody(p.body) }}
                >
                  <span className="curated-label">{p.label}</span>
                  <span className="curated-h" style={{ fontFamily: FONT_MAP[p.heading].stack, fontWeight: FONT_MAP[p.heading].head }}>Ag</span>
                  <span className="curated-names">{p.heading} + {p.body}</span>
                </button>
              )
            })}
          </div>
        </section>

        {/* ── Export ───────────────────────────────── */}
        <section className="block">
          <div className="block-head">
            <span className="section-label">Export</span>
          </div>
          <div className="export-card">
            <div className="export-item">
              <div className="export-item-head">
                <span className="export-item-label">Google Fonts &lt;link&gt;</span>
                <CopyButton text={linkSnippet}>Copy</CopyButton>
              </div>
              <pre className="code-block">{linkSnippet}</pre>
            </div>
            <div className="export-item">
              <div className="export-item-head">
                <span className="export-item-label">CSS</span>
                <CopyButton text={cssSnippet}>Copy</CopyButton>
              </div>
              <pre className="code-block">{cssSnippet}</pre>
            </div>
          </div>
        </section>
      </main>

      <footer className="credit">
        Coded by{' '}
        <a href="https://instagram.com/berkindev" target="_blank" rel="noopener noreferrer" className="credit-link">
          berkindev
        </a>
      </footer>
    </div>
  )
}

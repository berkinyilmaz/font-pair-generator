# Coddy · Part 3 — Font Pair Generator

30 günde 30 proje serisinin Coddy iş birliği kolunun 3. projesi. Slide temasında öğrenilen konu **arrays & objects** — bu app tam olarak onun üzerine kurulu: bir font kütüphanesi (array of objects) + eşleştirme motoru (object lookup).

---

## Konsept

Slidelarda anlatılan problem: iyi tipografi eşleşmesi bulmak zor. Çözüm: kullanıcı bir **başlık fontu** seçer, biz kontrast kurallarına göre ona **uyan gövde fontlarını** otomatik öneririz — canlı, düzenlenebilir önizleme + kopyalanabilir CSS ile.

Slide akışı: Cover → "Learn (arrays & objects) / Build / Ship" → "Better Fonts, Better Design" → CTA ("Comment FONT").

---

## Tasarım Dili (seri ile birebir)

En güncel referans `timestamp-converter` incelenip aynı dil korundu:

- **Dark-first** zemin: `#0a0a0c` + üstte hafif radial gradient
- **Tek aksan rengi**: indigo `#6366f1` — CTA, focus, aktif durumlar
- **Surface katmanları**: `--surface`, `--surface-2`, `--surface-hover` — yumuşak border + soft shadow
- **Köşeler**: 20px (kartlar) / 14px (select/kod bloğu) / pill (badge, chip, CTA)
- **Tipografi**: UI için Inter; önizleme alanları seçilen Google Font'ları render eder
- **Micro-interactions**: 180ms ease — hover'da subtle translateY + glow, shuffle ikonu 180° döner
- **İkonlar**: thin-line inline SVG (stroke 1.6, 12–13px)
- **Pure CSS + CSS custom properties** (Tailwind YOK)

---

## Stack

| Katman | Seçim | Neden |
|---|---|---|
| Framework | React 19 + Vite 5 | Serideki standart |
| Styling | Pure CSS + design tokens | `timestamp-converter` ile aynı |
| State | `useState` + `useMemo` + `useCallback` | Tek dosyada manage edilebilir |
| Font | Inter (UI) + 19 Google Font (önizleme) | Tek `<link>` ile yüklenir |
| Persistence | Yok — tamamen stateless client-side | Sunucu yok |

---

## Özellikler

1. **19 curated Google Font** — serif / sans / display kategorileri (`src/fonts.js`)
2. **Pairing engine** — başlık seçilince kontrast kuralına göre gövde önerileri
3. **Canlı düzenlenebilir önizleme** — başlık (`input`) + paragraf (`textarea`), gerçek zamanlı render
4. **Suggested bodies** chip'leri — tek tıkla gövde fontu değiştir
5. **8 curated pairing** — isimli vibe'lar (Editorial, Modern Tech, Luxury, Bold Poster…)
6. **Surprise me** — rastgele curated kombinasyon
7. **Size scale slider** — 80%–140% önizleme ölçeği
8. **Export** — Google Fonts `<link>` + kullanıma hazır CSS, one-click copy

---

## Mimari Notlar

### Dosya yapısı
```
font-pair-generator/
├── index.html          (tüm Google Fonts tek <link>)
├── package.json
├── vite.config.js
├── README.md
├── PROJECT_NOTES.md  ← bu dosya
└── src/
    ├── main.jsx        (React mount)
    ├── fonts.js        (font kütüphanesi + eşleştirme motoru)
    ├── App.jsx         (UI + etkileşim)
    └── styles.css      (design tokens + komponent stilleri)
```

### Eşleştirme motoru (`src/fonts.js`)
- `FONTS` — her biri `{ name, stack, category, mood, weights, head, body }` olan object array
- `FONT_MAP` — isimden hızlı erişim için object lookup (`Object.fromEntries`)
- `BODY_POOL` — kategoriye göre gövde havuzu: serif/display başlık → sans gövde, sans başlık → serif/humanist gövde (kontrast prensibi)
- `suggestBodies(headingName, n)` — havuzdan başlığın kendisini eleyip ilk `n` öneriyi döndürür
- `CURATED` — elle seçilmiş 8 gösterim çifti (isimli vibe ile)

### State şeması (App.jsx)
```js
{
  heading: 'Playfair Display',  // aktif başlık fontu
  body: 'Source Sans 3',        // aktif gövde fontu
  scale: 1,                     // 0.8–1.4 önizleme ölçeği
  headText: string,             // düzenlenebilir başlık metni
  bodyText: string,             // düzenlenebilir paragraf metni
}
```
- `applyHeading` — başlık değişince mevcut gövde öneri listesinde değilse en iyi öneriye snap eder
- `cssSnippet` / `linkSnippet` — `useMemo` ile aktif çiftten türetilir

### Erişilebilirlik
- Tüm select/buton/input'ta `aria-label` veya görünür metin
- `:focus` ile belirgin focus ring (aksan rengi)
- Tam klavye navigasyonu

---

## Tamamlandı / Test

- `npm install` — temiz
- `npm run build` — temiz (~350ms, 9.38kB CSS gzip 2.38kB, 203kB JS gzip 63kB)
- `npm run dev` — `localhost:5173` 200 OK
- Responsive: 720px (curated 2 kolon) ve 600px (tek kolon) breakpoint'leri

---

## Sonraki Adımlar (opsiyonel)

- Font arama kutusu (19+ font olunca dropdown yerine filtre)
- Gerçek başlık/gövde ağırlık seçici (weights datası zaten mevcut)
- Favorileme + `localStorage` ile kayıtlı çiftler
- Ters önizleme (light mode) toggle
- Slide içerikleri için statik export sayfası

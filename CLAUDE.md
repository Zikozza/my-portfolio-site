# Ahmed Mamdouh — 3D Portfolio

Static multi-page portfolio for a Senior 3D Artist. Plain HTML, CSS and JavaScript. No framework, no bundler, no build step.

## Commands
- `npm run dev`: serve the site at http://localhost:5173. A server is required: 3D models do not load from `file://`.
- `npm run check`: validate `assets/js/content.js` (ids, cross-references, missing files, oversized assets). Run it after every content change and fix all errors.

## How the site is built
- Every page (`index`, `services`, `work`, `project`, `about`, `contact`) is a thin HTML shell: `<div id="site-header">`, a `<main data-page="…">` with empty containers, `<div id="site-footer">`, then `content.js` and `main.js`.
- **All content lives in `assets/js/content.js`** as `window.SITE`. Edit content there, never hard-code it in HTML.
- `assets/js/main.js` renders each page by `data-page` (functions `R.home`, `R.services`, …). It also builds the shared header, footer and every media frame (`frame()`).
- `project.html` picks its project from the URL hash: `project.html#oil-factory`. `work.html#terrain` opens the work page filtered by service. `contact.html#modular` pre-selects a service. Use hashes for links, not query strings.
- `assets/css/style.css`: one stylesheet. Colors and fonts are tokens on `:root`. The design is dark-first, with light values under `prefers-color-scheme: light` and `[data-theme="light"]`. Never add a literal color in a component rule; add or reuse a token and give it both a dark and a light value.
- 3D uses Google's `<model-viewer>` web component (pinned to `@google/model-viewer@3.5.0` from jsDelivr in each page's `<head>`).

## Content model (`window.SITE`)
- `person`: name, email, links, `availability`, `cv` (PDF path), `formEndpoint` (Formspree URL; empty = copy-and-email fallback).
- `services[]`: `id`, `title`, `short`, `description`, `deliverables[]`, `bestFor`, `tools[]`, `media` (one item), `projects[]` (project ids). The site's focus is services, so every service should link to at least one project.
- `projects[]`: `id`, `title`, `client`, `year`, `role`, `services[]` (service ids), `summary`, `highlights[]`, `media[]`. `media[0]` is shown large on the project page. Card covers use the first image that has a `src`, else the first model.
- Media items, mixed freely in any order:
  - Image: `{ type: "image", src: "assets/renders/x.webp", alt, caption, slot }`. With `src: ""` it shows a UV-checker placeholder that prints `slot` (the suggested path).
  - Model: `{ type: "model", src: "assets/models/x.glb", poster?, caption, specs: ["12,400 tris", "4K PBR"], sample? }`. `sample: true` shows a "Sample model" badge; remove it once the real asset is in.
- Ids are lowercase-kebab-case and must be unique. `SHORT` in `main.js` holds the short label for each service id; add an entry when adding a service.

## Asset rules
- Renders go in `assets/renders/` as `.webp` (or `.avif`): ~2400px wide for a project's first image, ~1600px otherwise, under ~500 KB each.
- Models go in `assets/models/` as `.glb` with embedded textures, ideally under 10 MB. Compress with `npx @gltf-transform/cli optimize in.glb out.glb --compress meshopt`. Add a `poster` render for any model over ~5 MB.
- Every image needs real `alt` text that describes the shot.
- Specs shown on a model (`specs`) must be the asset's real numbers. Don't invent tri counts or texture sizes; ask Ahmed.

## Conventions
- Keep it dependency-free in the browser: no frameworks, no extra CDN libraries unless asked.
- Escape any content inserted into HTML with `esc()` in `main.js`.
- Keep pages working at 400px width with no horizontal scroll.
- Copy is short, plain and from the client's side ("What you get", "Start a project").
- Check facts against Ahmed's CV. Don't invent clients, numbers or testimonials.
- Client names: don't add NDA-covered client names without Ahmed confirming he may show them.

## Source facts (from Ahmed's CV): the only claims the site may make without asking
- 8+ years. Senior 3D Artist at OneClick, Cairo (Jun 2026–present): educational VR app, trim-sheet modular environments, 100+ FPS in VR with post-processing on.
- Exarol, Dubai, part time (Jan 2025–present): 50+ AR-ready assets, 8 Gaea terrains for AR and 3D printing, real-estate AR/VR interiors and exteriors. Spelling of the studio name still needs confirming ("Exarol" vs "Exaroll").
- T for Tech, Dubai, contract (Mar–Dec 2024): Lexus VR project, CAD retopology of vehicle interiors, modular oil-factory pack for commercial release, 20+ assets for the next pack, trim sheets.
- Nahdet Misr Publishing Group, Giza (Jun 2021–Jun 2026): Rehlaty 3D maps from concept art, AR/VR educational experiences.
- Cardoo, Cairo (May 2020–Jun 2021): 4 product visualization projects.
- Adma Labs, Giza (Nov 2018–Apr 2020): 3D printing prep, scan cleanup, UV-print graphics, rubber-industry models.
- Tools: 3ds Max, Substance 3D Painter, Gaea, V-Ray, Photoshop, Unity, Unreal Engine. Languages: Arabic, English.

## Before any deploy
1. `npm run check` passes with no errors.
2. No `sample: true` left, unless Ahmed wants a sample shown.
3. No empty image `src` left on the first media item of any project.
4. `person.email`, `artstation`, `formEndpoint` are correct.

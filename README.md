# Ahmed Mamdouh — 3D Portfolio

A static, multi-page portfolio. No build step: open `index.html` or upload the folder to any static host.

## Pages
| File | Purpose |
|---|---|
| `index.html` | Home: hero with live 3D model, stats, service switcher, selected work, process |
| `services.html` | One section per service: deliverables, best for, tools, related work |
| `work.html` | All projects, filterable by service (`work.html#terrain` opens pre-filtered) |
| `project.html` | Project breakdown, chosen by hash (`project.html#oil-factory`) |
| `about.html` | Bio, experience timeline, tools |
| `contact.html` | Contact details and project form |

## Editing content
Everything lives in **`assets/js/content.js`**: services, projects, stats, experience, contact details.

Each project and service has media items. Mix the two kinds freely:

```js
{ type: "image", src: "assets/renders/oil-factory-hero.webp", alt: "…", caption: "Hero render" }
{ type: "model", src: "assets/models/pipe-valve.glb", caption: "Pipe valve", specs: ["2,956 tris", "4K PBR"] }
```

- An image with `src: ""` shows a UV-checker "render slot" with the suggested file path. Drop the render in `assets/renders/` and fill in `src`.
- The three models in `assets/models/` are **sample stand-ins**. Replace them with real exports and delete `sample: true`.
- The first media item of a project is shown large and used as the card cover (a real render takes priority over a model).

## Preparing assets
- **Renders:** export WebP (or AVIF), about 2400px wide for heroes and 1600px for the rest, under ~500 KB each.
- **Models:** export `.glb` from 3ds Max (Babylon.js exporter or via Blender), embed textures, keep each under ~10 MB. For heavy models, compress with `gltf-transform optimize in.glb out.glb` and add a `poster` render so something shows while it loads.

## Contact form
Leave `formEndpoint` empty and the form builds a message the visitor copies and emails. To receive messages directly, create a free form at a service such as Formspree and paste its endpoint URL into `person.formEndpoint`.

## Working on the site with Claude Code
The folder is set up as a Claude Code project:
- `CLAUDE.md` explains the structure, content model, asset rules and facts from the CV. Claude Code reads it automatically.
- `npm run dev` serves the site at http://localhost:5173; `npm run check` validates the content.
- Project commands in `.claude/skills/`:
  - `/add-project <description>`: add a new project and link it to its services
  - `/add-media <id> <files>`: optimize renders or `.glb` models and wire them in
  - `/add-service <name>`: add or rewrite a service
  - `/ship-check`: pre-deploy review (read-only)

Open a terminal in this folder, run `claude`, and ask for changes in plain words, e.g. "add these three renders to the oil factory project".

## Deploying
Drag the folder into Netlify Drop, or push it to a GitHub repo and enable GitHub Pages / Vercel. Then point a custom domain (e.g. `ahmedmamdouh3d.com`) at it.

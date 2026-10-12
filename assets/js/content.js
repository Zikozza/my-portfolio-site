/* =====================================================================
   SITE CONTENT — edit this file to update the whole portfolio.
   ---------------------------------------------------------------------
   Media items come in two kinds, and you can mix them freely:

     { type: "image", src: "assets/renders/oil-factory-hero.webp",
       alt: "...", caption: "..." }

     { type: "model", src: "assets/models/pipe-valve.glb",
       poster: "assets/renders/pipe-valve-poster.webp",   // optional
       caption: "...", specs: ["2,956 tris", "4K PBR"] }

   An image with an empty src ("") shows a labelled render slot, so the
   layout stays intact until the real render is added.
   `sample: true` marks a stand-in model; delete it once a real one is in.
   ===================================================================== */

window.SITE = {
  person: {
    name: "Ahmed Mamdouh",
    role: "Senior 3D Artist",
    tagline: "Environments & real-time assets for games, VR and AR",
    location: "Cairo, Egypt · working remotely worldwide",
    email: "ahmed14456@gmail.com",
    artstation: "https://www.artstation.com/ahmed14456",
    linkedin: "",            // add a LinkedIn URL to show it in the footer
    availability: "Open to freelance and contract work",
    cv: "",                  // e.g. "assets/Ahmed_Mamdouh_CV.pdf"
    formEndpoint: ""         // e.g. a Formspree URL; leave empty to show the copy-and-email fallback
  },

  stats: [
    { value: "8+",   label: "years building real-time 3D" },
    { value: "100+", unit: "FPS", label: "VR target, post-processing on" },
    { value: "50+",  label: "AR-ready assets delivered for Exarol" },
    { value: "8",    label: "Gaea terrains for AR and 3D printing" }
  ],

  /* ---------------- SERVICES (the focus of the site) ---------------- */
  services: [
    {
      id: "hard-surface",
      title: "Game-ready props & hard-surface assets",
      short: "Clean low-poly assets with baked detail, tidy UVs and PBR textures, ready to drop into Unity or Unreal.",
      description: "From a sketch, photo reference or blockout to a finished asset: high-poly sculpt or subdivision model, low-poly game mesh, bakes, and Substance 3D Painter texturing. Every asset is built to a triangle budget and texel density agreed up front, with LODs where the platform needs them.",
      deliverables: ["FBX / GLB with clean pivots and naming", "PBR texture sets (Unity or Unreal packing)", "LOD0–LOD2 and simple collision", "Turntable and wireframe renders"],
      bestFor: "Game studios, asset-store packs, mobile and AR titles",
      tools: ["3ds Max", "Substance 3D Painter", "Photoshop"],
      media: { type: "model", src: "assets/models/cargo-case.glb", caption: "Hard-surface cargo case", specs: ["612 tris", "4 material IDs"], sample: true },
      projects: ["ar-asset-library", "oil-factory", "product-viz"]
    },
    {
      id: "modular",
      title: "Modular environments & trim sheets",
      short: "Grid-snapped kits and shared trim sheets that let a small team build big spaces with very few textures.",
      description: "I plan the kit before modeling: grid size, piece list, and which surfaces share a trim sheet. The result is a set of pieces that snap together cleanly, keeps one consistent texel density, and costs far fewer draw calls and texture memory than unique-textured geometry.",
      deliverables: ["Modular kit with documented grid and pivots", "Trim sheets and tiling materials", "Demo scene showing the kit assembled", "Set dressing of final scenes"],
      bestFor: "Industrial, sci-fi and interior environments; asset packs for commercial release",
      tools: ["3ds Max", "Substance 3D Painter", "Unity", "Unreal Engine"],
      media: { type: "model", src: "assets/models/pipe-valve.glb", caption: "Pipe valve junction, kit piece", specs: ["2,956 tris", "Trim-sheet ready"], sample: true },
      projects: ["oil-factory", "educational-vr"]
    },
    {
      id: "vr-ar",
      title: "VR & AR environment art",
      short: "Complete environments modeled, lit and integrated for headsets and phones, tuned to hold frame rate.",
      description: "VR punishes heavy scenes. I model, texture, light and integrate the whole environment in the engine, then profile and optimize until it holds 100+ FPS with post-processing on, while keeping the app's install size small. I also handle reference gathering and iterate quickly on client feedback.",
      deliverables: ["Lit, integrated Unity or Unreal scene", "Optimization pass: LODs, atlasing, baked lighting", "Performance report against the target headset", "Screenshots and walkthrough capture"],
      bestFor: "Training and education apps, automotive showrooms, real-estate walkthroughs",
      tools: ["Unity", "Unreal Engine", "3ds Max", "Substance 3D Painter"],
      media: { type: "image", src: "", alt: "VR environment render", caption: "Educational VR environment", slot: "assets/renders/vr-environment.webp" },
      projects: ["educational-vr", "automotive-vr", "real-estate", "rehlaty"]
    },
    {
      id: "terrain",
      title: "Terrain & landscape creation",
      short: "Procedural terrains in Gaea, exported as real-time meshes, heightmaps or print-ready models.",
      description: "Mountains, canyons, islands and table-top maps built in Gaea with erosion and masks, then exported for the target: a real-time mesh with splat maps for games and AR, or a watertight high-resolution model for 3D printing.",
      deliverables: ["Heightmap and splat/colour maps", "Optimized terrain mesh with LODs", "Watertight print-ready model on request", "Lit preview renders"],
      bestFor: "AR table-top experiences, game levels, physical 3D-printed maps",
      tools: ["Gaea", "3ds Max", "Unity"],
      media: { type: "model", src: "assets/models/terrain-tile.glb", caption: "Eroded terrain tile", specs: ["23,762 tris", "Vertex colour"], sample: true },
      projects: ["gaea-terrains"]
    },
    {
      id: "cad-viz",
      title: "CAD retopology & product visualization",
      short: "Manufacturer CAD turned into light, clean real-time meshes, and product renders for marketing.",
      description: "CAD data is accurate but far too heavy for real time. I retopologize it into efficient meshes that keep the silhouette and fine detail, for VR configurators and showrooms. For marketing, I produce photoreal product renders with V-Ray materials and lighting sized for each platform.",
      deliverables: ["Retopologized real-time mesh from CAD", "UVs and PBR materials matched to the real product", "Marketing renders for web, social and print", "Turntables"],
      bestFor: "Automotive and product brands, agencies, e-commerce",
      tools: ["3ds Max", "V-Ray", "Substance 3D Painter", "Photoshop"],
      media: { type: "image", src: "", alt: "Vehicle interior render", caption: "Retopologized vehicle interior", slot: "assets/renders/vehicle-interior.webp" },
      projects: ["automotive-vr", "product-viz"]
    },
    {
      id: "print",
      title: "3D print & scan preparation",
      short: "Scans cleaned up and models made watertight, scaled and detailed for the printer and the factory.",
      description: "I clean and repair 3D scans, rebuild missing detail, and prepare models for specific printing and manufacturing limits such as wall thickness, tolerances and part splits. I also design 2D artwork for UV printing and make sure it lines up with the 3D model.",
      deliverables: ["Watertight, scaled print files (STL / OBJ / 3MF)", "Repaired and detailed scan models", "Artwork for UV printing, aligned to the model", "Part splits and keys for large prints"],
      bestFor: "Product makers, industrial clients, collectible and map printing",
      tools: ["3ds Max", "Photoshop", "Gaea"],
      media: { type: "image", src: "", alt: "Cleaned 3D scan", caption: "Scan cleanup before and after", slot: "assets/renders/scan-cleanup.webp" },
      projects: ["gaea-terrains"]
    }
  ],

  process: [
    { title: "Brief & references", text: "We agree on scope, platform, triangle and texture budgets. I collect references and share a board." },
    { title: "Blockout", text: "A grey-box version in the engine checks scale, composition and the grid before any detail work." },
    { title: "Model & bake", text: "High and low poly modeling, UVs at the agreed texel density, and clean bakes." },
    { title: "Texture & light", text: "PBR texturing in Substance 3D Painter, trim sheets where they help, then lighting in the engine." },
    { title: "Optimize & deliver", text: "LODs, atlasing and profiling on the target device, then a tidy delivery with notes." }
  ],

  /* ---------------- PROJECTS ---------------- */
  projects: [
    {
      id: "oil-factory",
      title: "Modular Oil Factory Pack",
      client: "T for Tech",
      year: "2024",
      role: "3D Artist, contract",
      services: ["modular", "hard-surface"],
      summary: "A game-ready modular industrial environment pack built for commercial release, textured almost entirely with shared trim sheets.",
      highlights: [
        "Designed the trim sheets that texture the whole kit",
        "Produced 20+ unique game-ready assets for the company's next modular pack",
        "Kept geometry light and materials consistent for real-time use"
      ],
      media: [
        { type: "image", src: "", alt: "Oil factory environment", caption: "Hero render", slot: "assets/renders/oil-factory-hero.webp" },
        { type: "model", src: "assets/models/pipe-valve.glb", caption: "Pipe valve junction", specs: ["2,956 tris", "Trim sheet"], sample: true },
        { type: "image", src: "", alt: "Trim sheet layout", caption: "Trim sheet breakdown", slot: "assets/renders/oil-factory-trim.webp" },
        { type: "image", src: "", alt: "Wireframe of modular pieces", caption: "Kit pieces, wireframe", slot: "assets/renders/oil-factory-wire.webp" }
      ]
    },
    {
      id: "automotive-vr",
      title: "Automotive VR Experience",
      client: "Lexus, via T for Tech",
      year: "2024",
      role: "3D Artist, contract",
      services: ["vr-ar", "cad-viz"],
      summary: "Optimized 3D content for a real-time automotive VR experience, including vehicle interiors rebuilt from manufacturer CAD.",
      highlights: [
        "Retopologized vehicle interiors from manufacturer-provided CAD",
        "Built optimized real-time content for VR headsets",
        "Matched materials to the real vehicle finishes"
      ],
      media: [
        { type: "image", src: "", alt: "Vehicle interior in VR", caption: "Interior, in engine", slot: "assets/renders/auto-interior.webp" },
        { type: "image", src: "", alt: "CAD versus retopology wireframe", caption: "CAD vs. retopology", slot: "assets/renders/auto-retopo.webp" },
        { type: "image", src: "", alt: "Showroom environment", caption: "Showroom environment", slot: "assets/renders/auto-showroom.webp" }
      ]
    },
    {
      id: "educational-vr",
      title: "Educational VR Environments",
      client: "OneClick",
      year: "2026, in production",
      role: "Senior 3D Artist",
      services: ["vr-ar", "modular"],
      summary: "Environments and assets for an upcoming educational VR application, built with modular kits and trim sheets.",
      highlights: [
        "Holds 100+ FPS in VR with post-processing enabled",
        "Modular, trim-sheet environments keep the install size small",
        "Owns reference research and iterates on team feedback"
      ],
      media: [
        { type: "image", src: "", alt: "Educational VR classroom", caption: "Environment overview", slot: "assets/renders/edu-vr-01.webp" },
        { type: "image", src: "", alt: "Modular kit pieces", caption: "Modular kit", slot: "assets/renders/edu-vr-kit.webp" }
      ]
    },
    {
      id: "rehlaty",
      title: "Rehlaty 3D Maps",
      client: "Nahdet Misr Publishing Group",
      year: "2021–2026",
      role: "3D Artist",
      services: ["vr-ar"],
      summary: "Complete 3D maps for the company's flagship educational project, built and integrated from concept art.",
      highlights: [
        "Turned concept art into complete, integrated 3D maps",
        "Applied PBR materials and shading from initial sketches",
        "Optimized models for AR and VR performance"
      ],
      media: [
        { type: "image", src: "", alt: "Rehlaty map overview", caption: "Map overview", slot: "assets/renders/rehlaty-01.webp" },
        { type: "image", src: "", alt: "Concept art beside final map", caption: "Concept to final", slot: "assets/renders/rehlaty-concept.webp" }
      ]
    },
    {
      id: "gaea-terrains",
      title: "Gaea Terrain Series",
      client: "Exarol",
      year: "2025",
      role: "3D Artist, part time",
      services: ["terrain", "print"],
      summary: "Eight optimized terrains built in Gaea, used both in AR applications and as physical 3D prints.",
      highlights: [
        "8 terrains delivered for AR and 3D printing",
        "Separate exports for real-time meshes and print-ready models",
        "Erosion and masking tuned to read well at table-top scale"
      ],
      media: [
        { type: "model", src: "assets/models/terrain-tile.glb", caption: "Terrain tile", specs: ["23,762 tris", "Vertex colour"], sample: true },
        { type: "image", src: "", alt: "Printed terrain", caption: "3D printed result", slot: "assets/renders/terrain-print.webp" },
        { type: "image", src: "", alt: "Terrain in AR", caption: "Terrain in AR", slot: "assets/renders/terrain-ar.webp" }
      ]
    },
    {
      id: "ar-asset-library",
      title: "AR Asset Library",
      client: "Exarol",
      year: "2025–present",
      role: "3D Artist, part time",
      services: ["hard-surface"],
      summary: "More than fifty unique AR-ready assets, modeled, UV mapped and PBR textured for mobile games and AR experiences.",
      highlights: [
        "50+ unique assets delivered",
        "Built for mobile budgets and AR viewers",
        "Consistent PBR look across the whole library"
      ],
      media: [
        { type: "model", src: "assets/models/cargo-case.glb", caption: "Cargo case", specs: ["612 tris", "PBR"], sample: true },
        { type: "image", src: "", alt: "Asset library lineup", caption: "Library lineup", slot: "assets/renders/ar-lineup.webp" }
      ]
    },
    {
      id: "real-estate",
      title: "Real-Estate AR/VR Walkthroughs",
      client: "Exarol",
      year: "2025",
      role: "3D Artist, part time",
      services: ["vr-ar"],
      summary: "Interactive interior and exterior walkthroughs for property clients, built to each client's brief.",
      highlights: [
        "Interior and exterior spaces for AR and VR",
        "Tailored to each client's requirements",
        "Real-time lighting and materials"
      ],
      media: [
        { type: "image", src: "", alt: "Apartment interior", caption: "Interior walkthrough", slot: "assets/renders/realestate-interior.webp" },
        { type: "image", src: "", alt: "Building exterior", caption: "Exterior", slot: "assets/renders/realestate-exterior.webp" }
      ]
    },
    {
      id: "product-viz",
      title: "Product Visualization Campaigns",
      client: "Cardoo",
      year: "2020–2021",
      role: "3D Generalist",
      services: ["cad-viz", "hard-surface"],
      summary: "Four product visualization projects for social media, websites and advertising campaigns.",
      highlights: [
        "4 major campaigns delivered",
        "Realistic materials and lighting for each product",
        "Outputs sized for each platform's requirements"
      ],
      media: [
        { type: "image", src: "", alt: "Product render", caption: "Campaign hero", slot: "assets/renders/product-01.webp" },
        { type: "image", src: "", alt: "Product detail render", caption: "Material detail", slot: "assets/renders/product-02.webp" }
      ]
    }
  ],

  /* ---------------- ABOUT ---------------- */
  about: [
    "I'm a 3D artist from Cairo with more than eight years of experience making game-ready assets, environments and real-time content for PC and mobile games, VR, AR and educational apps.",
    "My core is hard-surface modeling, modular environments built on trim sheets, and PBR texturing, always with an eye on performance. I integrate my own work in Unity and Unreal, so what I deliver is already tested in the engine."
  ],

  experience: [
    { company: "OneClick", place: "Cairo", role: "Senior 3D Artist", dates: "Jun 2026 – present" },
    { company: "Exarol", place: "Dubai, remote", role: "3D Artist, part time", dates: "Jan 2025 – present" },
    { company: "T for Tech", place: "Dubai, remote", role: "3D Artist, contract", dates: "Mar 2024 – Dec 2024" },
    { company: "Nahdet Misr Publishing Group", place: "Giza", role: "3D Artist", dates: "Jun 2021 – Jun 2026" },
    { company: "Cardoo", place: "Cairo", role: "3D Generalist", dates: "May 2020 – Jun 2021" },
    { company: "Adma Labs", place: "Giza", role: "3D Artist", dates: "Nov 2018 – Apr 2020" }
  ],

  tools: [
    { group: "Modeling & texturing", items: ["3ds Max", "Substance 3D Painter", "Photoshop", "V-Ray"] },
    { group: "Terrain", items: ["Gaea"] },
    { group: "Engines", items: ["Unity", "Unreal Engine"] },
    { group: "Languages", items: ["Arabic (native)", "English"] }
  ]
};

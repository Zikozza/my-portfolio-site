/* Renders every page from window.SITE (assets/js/content.js). */
(function () {
  const S = window.SITE;
  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const svc = (id) => S.services.find((s) => s.id === id);
  const proj = (id) => S.projects.find((p) => p.id === id);
  const main = $("main[data-page]");
  const page = main ? main.dataset.page : "";

  /* Optional: models embedded as base64 (window.MODEL_DATA) for hosts that can't serve .glb files. */
  const blobs = {};
  const modelSrc = (src) => {
    const b64 = window.MODEL_DATA && window.MODEL_DATA[src];
    if (!b64) return src;
    if (!blobs[src]) {
      const bin = atob(b64), bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      blobs[src] = URL.createObjectURL(new Blob([bytes], { type: "model/gltf-binary" }));
    }
    return blobs[src];
  };

  /* ---------- one viewport frame: image, empty render slot, or 3D model ---------- */
  function frame(m, o = {}) {
    const cls = ["frame", o.size || ""].join(" ").trim();
    const ticks = '<span class="tick tl"></span><span class="tick tr"></span><span class="tick bl"></span><span class="tick br"></span>';
    let stage, label = o.label || "", tool = "", hint = "";
    if (m.type === "model") {
      const interactive = o.interactive !== false;
      stage = `<model-viewer src="${esc(modelSrc(m.src))}" ${m.poster ? `poster="${esc(m.poster)}"` : ""} alt="${esc(m.caption)}"
        ${interactive ? "camera-controls" : ""} disable-zoom auto-rotate auto-rotate-delay="0" rotation-per-second="16deg"
        camera-orbit="35deg 68deg auto" shadow-intensity="1" shadow-softness=".8" exposure="1.05"
        environment-image="neutral" interaction-prompt="none" touch-action="pan-y" loading="lazy"></model-viewer>`;
      label = label || "3D · Persp · Lit";
      if (interactive) {
        tool = '<button type="button" class="frame-tool" data-spin aria-pressed="true">Turntable</button>';
        hint = '<span class="hint">Drag to orbit</span>';
      }
    } else if (m.src) {
      stage = `<img src="${esc(m.src)}" alt="${esc(m.alt || m.caption)}" loading="lazy" ${o.interactive === false ? "" : "data-zoom"}>`;
      label = label || "Render";
    } else {
      stage = `<div class="slot" role="img" aria-label="Render placeholder: ${esc(m.caption)}"><div class="slot-inner"><b>${esc(m.caption)}</b><span class="mono muted">Render slot</span>${m.slot ? `<code>${esc(m.slot)}</code>` : ""}</div></div>`;
      label = label || "Render";
    }
    const chips = (m.specs || []).map((s) => `<span class="chip">${esc(s)}</span>`).join("") + (m.sample ? '<span class="chip sample">Sample model</span>' : "");
    const bar = o.bar === false ? "" : `<div class="frame-bar"><span class="frame-cap">${esc(m.caption)}</span>${chips ? `<span class="chips">${chips}</span>` : ""}</div>`;
    return `<figure class="${cls}" style="margin:0"><div class="frame-stage">${ticks}<span class="frame-label">${esc(label)}</span>${tool}${stage}${hint}</div>${bar}</figure>`;
  }

  function cover(p) {
    return p.media.find((m) => m.type === "image" && m.src) || p.media.find((m) => m.type === "model") || p.media[0];
  }

  function card(p) {
    const tags = p.services.map((id) => `<span class="chip">${esc(shortName(id))}</span>`).join("");
    return `<a class="card" href="project.html#${esc(p.id)}" data-services="${esc(p.services.join(" "))}">
      ${frame(cover(p), { interactive: false, bar: false, label: `${p.client}` })}
      <div class="card-body"><span class="card-meta mono"><span>${esc(p.client)}</span><span>${esc(p.year)}</span></span>
      <h3>${esc(p.title)}</h3><span class="chips">${tags}</span></div></a>`;
  }

  const SHORT = { "hard-surface": "Props & hard-surface", modular: "Modular & trims", "vr-ar": "VR / AR", terrain: "Terrain", "cad-viz": "CAD & product viz", print: "3D print & scans" };
  const shortName = (id) => SHORT[id] || svc(id)?.title || id;

  /* ---------- shared header and footer ---------- */
  const NAV = [["home", "index.html", "Home"], ["services", "services.html", "Services"], ["work", "work.html", "Work"], ["about", "about.html", "About"]];
  const header = $("#site-header");
  if (header) {
    const active = page === "project" ? "work" : page;
    header.outerHTML = `<header class="site-header"><div class="wrap">
      <a class="brand" href="index.html" aria-label="${esc(S.person.name)}, home"><span class="brand-mark">AM</span><span class="brand-name">${esc(S.person.name)}</span></a>
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav">Menu</button>
      <nav class="nav" id="nav">${NAV.map(([k, h, t]) => `<a href="${h}" ${k === active ? 'aria-current="page"' : ""}>${t}</a>`).join("")}
      <a class="nav-cta" href="contact.html" ${active === "contact" ? 'aria-current="page"' : ""}>Start a project</a></nav></div></header>`;
  }
  const footer = $("#site-footer");
  if (footer) {
    const links = [["ArtStation", S.person.artstation], ["LinkedIn", S.person.linkedin]].filter((l) => l[1]);
    footer.outerHTML = `<footer class="site-footer"><div class="wrap">
      <span class="mono muted">© ${new Date().getFullYear()} ${esc(S.person.name)} · ${esc(S.person.location)}</span>
      <span class="foot-links">${NAV.map(([, h, t]) => `<a href="${h}">${t}</a>`).join("")}<a href="contact.html">Contact</a>${links.map(([t, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${t}</a>`).join("")}</span>
    </div></footer>`;
  }

  /* ---------- pages ---------- */
  const R = {};

  R.home = () => {
    const hero = S.services.find((s) => s.id === "modular").media;
    $("#hero-view").innerHTML = frame(hero, { label: "3D · Persp · Lit" });
    $("#avail-hero").textContent = S.person.availability;
    $("#stats").innerHTML = S.stats.map((s) => `<div class="stat"><span class="stat-v">${esc(s.value)}${s.unit ? `<small>${esc(s.unit)}</small>` : ""}</span><span class="stat-l">${esc(s.label)}</span></div>`).join("");

    const list = $("#svc-list"), view = $("#svc-view");
    list.innerHTML = S.services.map((s, i) => `<button class="svc-item" type="button" role="tab" id="tab-${s.id}" aria-selected="${i === 0}" data-id="${s.id}">
      <h3>${esc(s.title)}</h3><span class="mono">${s.media.type === "model" ? "3D" : "Render"}</span><p>${esc(s.short)}</p></button>`).join("");
    const show = (id) => {
      const s = svc(id);
      list.querySelectorAll(".svc-item").forEach((b) => b.setAttribute("aria-selected", b.dataset.id === id));
      view.innerHTML = frame(s.media) + `<div class="switch-meta"><span class="eyebrow">You get</span>
        <ul>${s.deliverables.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>
        <a class="btn arrow" href="services.html#${s.id}" style="justify-self:start">Service details</a></div>`;
    };
    list.addEventListener("click", (e) => { const b = e.target.closest(".svc-item"); if (b) show(b.dataset.id); });
    show(S.services[0].id);

    $("#home-work").innerHTML = S.projects.slice(0, 4).map(card).join("");
    $("#steps").innerHTML = S.process.map((s) => `<div class="step"><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div>`).join("");
  };

  R.services = () => {
    $("#jump").innerHTML = S.services.map((s) => `<a class="filter" href="#${s.id}">${esc(shortName(s.id))}</a>`).join("");
    $("#svc-sections").innerHTML = S.services.map((s) => {
      const rel = s.projects.map(proj).filter(Boolean);
      return `<section class="svc" id="${s.id}">
        <div class="svc-text"><span class="eyebrow">${esc(shortName(s.id))}</span><h2>${esc(s.title)}</h2><p>${esc(s.description)}</p>
          <div class="dl"><div><h4>Deliverables</h4><ul>${s.deliverables.map((d) => `<li>${esc(d)}</li>`).join("")}</ul></div>
          <div style="display:grid;gap:1.1rem;align-content:start"><div><h4>Best for</h4><p>${esc(s.bestFor)}</p></div><div><h4>Tools</h4><span class="chips">${s.tools.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</span></div></div></div>
          ${rel.length ? `<div class="related"><span class="mono muted">Related work</span>${rel.map((p) => `<a href="project.html#${p.id}">${esc(p.title)}</a>`).join("")}</div>` : ""}
          <div class="btn-row"><a class="btn btn-primary arrow" href="contact.html#${s.id}">Ask about this service</a><a class="btn" href="work.html#${s.id}">See this work</a></div>
        </div>
        <div class="svc-media">${frame(s.media)}</div></section>`;
    }).join("");
    $("#steps").innerHTML = S.process.map((s) => `<div class="step"><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div>`).join("");
    if (location.hash) { const t = document.getElementById(location.hash.slice(1)); if (t) setTimeout(() => t.scrollIntoView(), 50); }
  };

  R.work = () => {
    const grid = $("#work-grid"), bar = $("#filters");
    grid.innerHTML = S.projects.map(card).join("");
    bar.innerHTML = `<button class="filter" type="button" data-f="all">All work</button>` + S.services.map((s) => `<button class="filter" type="button" data-f="${s.id}">${esc(shortName(s.id))}</button>`).join("");
    const apply = (f) => {
      if (!svc(f)) f = "all";
      bar.querySelectorAll(".filter").forEach((b) => b.setAttribute("aria-pressed", b.dataset.f === f));
      grid.querySelectorAll(".card").forEach((c) => { c.hidden = f !== "all" && !c.dataset.services.split(" ").includes(f); });
    };
    bar.addEventListener("click", (e) => { const b = e.target.closest(".filter"); if (b) apply(b.dataset.f); });
    apply(location.hash.slice(1) || "all");
  };

  R.project = () => {
    const render = () => {
      const i = Math.max(0, S.projects.findIndex((p) => p.id === location.hash.slice(1)));
      const p = S.projects[i];
      const prev = S.projects[(i - 1 + S.projects.length) % S.projects.length];
      const next = S.projects[(i + 1) % S.projects.length];
      document.title = `${p.title} · ${S.person.name}`;
      $("#project").innerHTML = `
        <div class="proj-head"><div><a class="mono muted" href="work.html" style="text-decoration:none">← All work</a><h1>${esc(p.title)}</h1></div>
          <dl class="facts"><dt>Client</dt><dd>${esc(p.client)}</dd><dt>Year</dt><dd>${esc(p.year)}</dd><dt>Role</dt><dd>${esc(p.role)}</dd>
          <dt>Services</dt><dd>${p.services.map((id) => `<a href="services.html#${id}">${esc(shortName(id))}</a>`).join(", ")}</dd></dl></div>
        <div class="proj-body"><p class="lede" style="color:var(--fg)">${esc(p.summary)}</p><ul>${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul></div>
        <div class="gallery">${p.media.map((m, k) => frame(m, { size: k === 0 ? "wide" : "" })).join("")}</div>
        <nav class="pager" aria-label="More projects"><a href="project.html#${prev.id}"><span class="mono muted">← Previous</span><b>${esc(prev.title)}</b></a>
          <a href="project.html#${next.id}"><span class="mono muted">Next →</span><b>${esc(next.title)}</b></a></nav>`;
    };
    render();
    addEventListener("hashchange", () => { render(); scrollTo(0, 0); });
  };

  R.about = () => {
    $("#about-text").innerHTML = S.about.map((t, i) => `<p class="${i === 0 ? "lede" : ""}">${esc(t)}</p>`).join("");
    $("#stats").innerHTML = S.stats.map((s) => `<div class="stat"><span class="stat-v">${esc(s.value)}${s.unit ? `<small>${esc(s.unit)}</small>` : ""}</span><span class="stat-l">${esc(s.label)}</span></div>`).join("");
    $("#timeline").innerHTML = S.experience.map((e) => `<li><span class="mono muted">${esc(e.dates)}</span><b>${esc(e.company)}</b><span>${esc(e.role)} · <span class="muted">${esc(e.place)}</span></span></li>`).join("");
    $("#tools").innerHTML = S.tools.map((g) => `<div><h3>${esc(g.group)}</h3><ul>${g.items.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>`).join("");
    if (S.person.cv) $("#cv-link").innerHTML = `<a class="btn arrow" href="${esc(S.person.cv)}" target="_blank" rel="noopener">Download CV (PDF)</a>`;
  };

  R.contact = () => {
    $("#email").textContent = S.person.email;
    $("#artstation").innerHTML = `<a href="${esc(S.person.artstation)}" target="_blank" rel="noopener">${esc(S.person.artstation.replace(/^https?:\/\/(www\.)?/, ""))}</a>`;
    $("#avail").textContent = S.person.availability;
    const sel = $("#f-service");
    sel.innerHTML = `<option value="">Choose a service</option>` + S.services.map((s) => `<option value="${s.id}">${esc(s.title)}</option>`).join("") + `<option value="other">Something else</option>`;
    if (svc(location.hash.slice(1))) sel.value = location.hash.slice(1);

    $("#contact-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const f = e.target, d = new FormData(f), out = $("#form-result");
      const service = svc(d.get("service"))?.title || d.get("service") || "Not specified";
      if (S.person.formEndpoint) {
        try {
          const r = await fetch(S.person.formEndpoint, { method: "POST", body: d, headers: { Accept: "application/json" } });
          if (!r.ok) throw new Error();
          out.innerHTML = `<p><b>Message sent.</b> Thanks, ${esc(d.get("name"))}. I'll reply to ${esc(d.get("email"))} within two working days.</p>`;
          out.hidden = false; f.reset(); return;
        } catch (_) { /* fall through to the copy fallback */ }
      }
      const text = `Hi Ahmed,\n\nService: ${service}\nTimeline: ${d.get("timeline") || "Flexible"}\n\n${d.get("message")}\n\n${d.get("name")}\n${d.get("email")}`;
      out.innerHTML = `<p><b>Your message is ready.</b> Copy it and send it to <b>${esc(S.person.email)}</b>.</p><pre id="msg-text">${esc(text)}</pre>
        <div class="btn-row"><button class="btn btn-primary" type="button" data-copy="#msg-text">Copy message</button><button class="btn" type="button" data-copy-text="${esc(S.person.email)}">Copy email address</button></div>`;
      out.hidden = false;
    });
  };

  if (R[page]) R[page]();

  /* ---------- shared interactions ---------- */
  document.addEventListener("click", (e) => {
    const menu = e.target.closest(".menu-btn");
    if (menu) { const n = $("#nav"); const open = n.classList.toggle("open"); menu.setAttribute("aria-expanded", open); }

    const spin = e.target.closest("[data-spin]");
    if (spin) {
      const mv = spin.parentElement.querySelector("model-viewer");
      const on = spin.getAttribute("aria-pressed") !== "true";
      spin.setAttribute("aria-pressed", on);
      if (mv) mv.autoRotate = on;
    }

    const copy = e.target.closest("[data-copy], [data-copy-text]");
    if (copy) {
      const src = copy.dataset.copy ? $(copy.dataset.copy) : null;
      const text = copy.dataset.copyText || (src ? src.textContent : "");
      const label = copy.textContent;
      const done = (msg) => { copy.textContent = msg; setTimeout(() => (copy.textContent = label), 1600); };
      try {
        navigator.clipboard.writeText(text).then(() => done("Copied"), () => { selectText(src || copy); done("Selected, press Ctrl+C"); });
      } catch (_) { selectText(src || copy); done("Selected, press Ctrl+C"); }
    }

    const img = e.target.closest("img[data-zoom]");
    if (img) {
      const box = document.createElement("div");
      box.className = "lightbox";
      box.innerHTML = `<img src="${img.src}" alt="${esc(img.alt)}"><button class="btn" type="button">Close</button>`;
      box.addEventListener("click", () => box.remove());
      document.body.appendChild(box);
    }
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") document.querySelector(".lightbox")?.remove(); });

  function selectText(el) {
    const r = document.createRange(); r.selectNodeContents(el);
    const s = getSelection(); s.removeAllRanges(); s.addRange(r);
  }
})();

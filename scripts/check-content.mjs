// Validates assets/js/content.js: ids, cross-references, media fields, missing and oversized files.
// Usage: npm run check   (exits with code 1 when there are errors)
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "assets/js/content.js"), "utf8"), sandbox);
const S = sandbox.window.SITE;

const errors = [], warnings = [];
const err = (m) => errors.push(m), warn = (m) => warnings.push(m);
const kebab = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const KB = 1024, MB = 1024 * KB;

if (!S) { console.error("content.js did not define window.SITE"); process.exit(1); }

function checkIds(list, kind) {
  const seen = new Set();
  for (const item of list) {
    if (!item.id) err(`${kind} without an id: "${item.title}"`);
    else if (!kebab.test(item.id)) err(`${kind} id "${item.id}" must be lowercase-kebab-case`);
    if (seen.has(item.id)) err(`duplicate ${kind} id "${item.id}"`);
    seen.add(item.id);
  }
  return seen;
}
const serviceIds = checkIds(S.services, "service");
const projectIds = checkIds(S.projects, "project");

function checkMedia(m, where) {
  if (!m || !["image", "model"].includes(m.type)) return err(`${where}: media type must be "image" or "model"`);
  if (!m.caption) warn(`${where}: media has no caption`);
  if (m.type === "image" && !m.src) return warn(`${where}: render slot still empty (${m.slot || "no slot path"})`);
  if (m.type === "image" && !m.alt) err(`${where}: image "${m.src}" needs alt text`);
  if (m.type === "model" && !m.src) return err(`${where}: model has no src`);
  if (m.type === "model" && m.sample) warn(`${where}: "${m.src}" is still a sample model`);
  for (const file of [m.src, m.poster].filter(Boolean)) {
    if (/^https?:/.test(file)) continue;
    const p = path.join(root, file);
    if (!fs.existsSync(p)) { err(`${where}: file not found: ${file}`); continue; }
    const size = fs.statSync(p).size;
    const ext = path.extname(file).toLowerCase();
    if (ext === ".glb" || ext === ".gltf") {
      if (size > 25 * MB) err(`${where}: ${file} is ${(size / MB).toFixed(1)} MB; compress it (see CLAUDE.md)`);
      else if (size > 10 * MB) warn(`${where}: ${file} is ${(size / MB).toFixed(1)} MB; consider compressing and adding a poster`);
    } else if (size > 600 * KB) warn(`${where}: ${file} is ${Math.round(size / KB)} KB; aim for under 500 KB`);
    if ([".png", ".jpg", ".jpeg"].includes(ext)) warn(`${where}: ${file} could be converted to .webp`);
  }
}

for (const s of S.services) {
  const w = `service "${s.id}"`;
  for (const f of ["title", "short", "description"]) if (!s[f]) err(`${w}: missing ${f}`);
  if (!s.deliverables?.length) err(`${w}: add at least one deliverable`);
  checkMedia(s.media, w);
  if (!s.projects?.length) warn(`${w}: links to no projects`);
  for (const id of s.projects || []) if (!projectIds.has(id)) err(`${w}: unknown project "${id}"`);
}

for (const p of S.projects) {
  const w = `project "${p.id}"`;
  for (const f of ["title", "client", "year", "summary"]) if (!p[f]) err(`${w}: missing ${f}`);
  if (!p.services?.length) err(`${w}: tag at least one service`);
  for (const id of p.services || []) if (!serviceIds.has(id)) err(`${w}: unknown service "${id}"`);
  if (!p.media?.length) err(`${w}: needs at least one media item`);
  (p.media || []).forEach((m, i) => checkMedia(m, `${w} media[${i}]`));
}

const mainJs = fs.readFileSync(path.join(root, "assets/js/main.js"), "utf8");
for (const id of serviceIds) if (!new RegExp(`["']?${id}["']?\\s*:`).test(mainJs.split("const SHORT")[1]?.split("};")[0] || "")) warn(`service "${id}" has no short label in SHORT (main.js)`);

if (!S.person?.email) err("person.email is empty");
if (!S.person?.formEndpoint) warn("person.formEndpoint is empty: the contact form uses the copy-and-email fallback");

for (const w of warnings) console.log(`warn   ${w}`);
for (const e of errors) console.log(`ERROR  ${e}`);
console.log(`\n${S.services.length} services, ${S.projects.length} projects · ${errors.length} errors, ${warnings.length} warnings`);
process.exit(errors.length ? 1 : 0);

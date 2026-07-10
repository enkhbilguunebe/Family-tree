/* =========================================================
   1. Config / password
   ========================================================= */
const APP_PASSWORD = "Лочин";

const CONFIG = {
  nodeGapX: 128,
  levelGapY: 250,
  spouseGap: 92,
  marginX: 360,
  marginY: 260,
  minScale: 0.28,
  maxScale: 1.8
};

/* =========================================================
   2. Family data
   Known logic:
   - 2 founders
   - founders have 11 children
   - 10 stop there
   - child 11 continues with 8 children
   - those 8 branches follow the user's current known structure
   ========================================================= */
const familyData = [
  person("f1", "Үүсгэн байгуулагч 1", "bloodline", [], "f2", ["c1","c2","c3","c4","c5","c6","c7","c8","c9","c10","c11"], 0, "Өвөг", "Unknown"),
  person("f2", "Үүсгэн байгуулагч 2", "spouse", [], "f1", [], 0, "Эмэг", "Unknown"),

  ...range(1, 11).map(i => person(`c${i}`, `11 хүүхэд ${i}`, "bloodline", ["f1","f2"], `c${i}s`, i === 11 ? ["b1","b2","b3","b4","b5","b6","b7","b8"] : [], 1, "Хүүхэд", "Unknown")),
  ...range(1, 11).map(i => spouse(`c${i}s`, `Хань ${i}`, `c${i}`, 1)),

  person("b1", "8 хүүхэд 1", "bloodline", ["c11"], "b1s", ["b1a","b1b"], 2, "Салбар 1", "Unknown"),
  person("b2", "8 хүүхэд 2", "bloodline", ["c11"], "b2s", ["b2a","b2b"], 2, "Салбар 2", "Unknown"),
  person("b3", "8 хүүхэд 3", "bloodline", ["c11"], "b3s", ["b3a","b3b"], 2, "Салбар 3", "Unknown"),
  person("b4", "8 хүүхэд 4", "bloodline", ["c11"], "b4s", ["b4a","b4b","b4c"], 2, "Салбар 4", "Unknown"),
  person("b5", "8 хүүхэд 5", "bloodline", ["c11"], "b5s", ["b5a","b5b","b5c"], 2, "Салбар 5", "Unknown"),
  person("b6", "8 хүүхэд 6", "bloodline", ["c11"], "b6s", ["b6a","b6b"], 2, "Салбар 6", "Unknown"),
  person("b7", "8 хүүхэд 7", "bloodline", ["c11"], "b7s", ["b7a"], 2, "Салбар 7", "Unknown"),
  person("b8", "8 хүүхэд 8", "bloodline", ["c11"], "b8s", ["b8a"], 2, "Салбар 8", "Unknown"),
  ...range(1, 8).map(i => spouse(`b${i}s`, `Салбар ${i} хань`, `b${i}`, 2)),

  person("b1a", "1-р хүүхдийн хүүхэд 1", "bloodline", ["b1"], "b1as", ["b1a1","b1a2"], 3, "Ач/зээ", "Unknown"),
  person("b1b", "1-р хүүхдийн хүүхэд 2", "bloodline", ["b1"], "b1bs", ["b1b1"], 3, "Ач/зээ", "Unknown"),

  person("b2a", "2-р хүүхдийн хүүхэд 1", "bloodline", ["b2"], "b2as", ["b2a1"], 3, "Ач/зээ", "Unknown"),
  person("b2b", "2-р хүүхдийн хүүхэд 2", "bloodline", ["b2"], "b2bs", [], 3, "Ач/зээ", "Unknown"),

  person("b3a", "3-р хүүхдийн хүүхэд 1", "bloodline", ["b3"], "b3as", [], 3, "Ач/зээ", "Unknown"),
  person("b3b", "3-р хүүхдийн хүүхэд 2", "bloodline", ["b3"], "b3bs", [], 3, "Ач/зээ", "Unknown"),

  person("b4a", "4-р хүүхдийн хүүхэд 1", "bloodline", ["b4"], "b4as", [], 3, "Ач/зээ", "Unknown"),
  person("b4b", "4-р хүүхдийн хүүхэд 2", "bloodline", ["b4"], "b4bs", [], 3, "Ач/зээ", "Unknown"),
  person("b4c", "4-р хүүхдийн хүүхэд 3", "bloodline", ["b4"], "b4cs", [], 3, "Ач/зээ", "Unknown"),

  person("b5a", "5-р хүүхдийн хүүхэд 1", "bloodline", ["b5"], "b5as", [], 3, "Ач/зээ", "Unknown"),
  person("b5b", "5-р хүүхдийн хүүхэд 2", "bloodline", ["b5"], "b5bs", [], 3, "Ач/зээ", "Unknown"),
  person("b5c", "5-р хүүхдийн хүүхэд 3", "bloodline", ["b5"], "b5cs", [], 3, "Ач/зээ", "Unknown"),

  person("b6a", "6-р хүүхдийн хүүхэд 1", "bloodline", ["b6"], "b6as", [], 3, "Ач/зээ", "Unknown"),
  person("b6b", "6-р хүүхдийн хүүхэд 2", "bloodline", ["b6"], "b6bs", [], 3, "Ач/зээ", "Unknown"),

  person("b7a", "7-р хүүхдийн хүүхэд 1", "bloodline", ["b7"], "b7as", [], 3, "Ач/зээ", "Unknown"),
  person("b8a", "8-р хүүхдийн хүүхэд 1", "bloodline", ["b8"], "b8as", [], 3, "Ач/зээ", "Unknown"),

  person("b1a1", "1-1 салааны хүүхэд 1", "bloodline", ["b1a"], "", [], 4, "Гуч", "Unknown"),
  person("b1a2", "1-1 салааны хүүхэд 2", "bloodline", ["b1a"], "", [], 4, "Гуч", "Unknown"),
  person("b1b1", "1-2 салааны хүүхэд 1", "bloodline", ["b1b"], "", [], 4, "Гуч", "Unknown"),
  person("b2a1", "2-1 салааны хүүхэд 1", "bloodline", ["b2a"], "", [], 4, "Гуч", "Unknown"),

  ...["b1a","b1b","b2a","b2b","b3a","b3b","b4a","b4b","b4c","b5a","b5b","b5c","b6a","b6b","b7a","b8a"].map(id => spouse(`${id}s`, `${id.toUpperCase()} хань`, id, 3))
];

function person(id, name, type, parentIds, spouseId, childrenIds, generation, relation, birthYear) {
  return {
    id,
    name,
    type,
    gender: type === "spouse" ? "female" : "unknown",
    parentIds,
    spouseId,
    childrenIds,
    generation,
    relation,
    birthYear,
    birthplace: "Монгол",
    ovog: "Лочин",
    urgiinOvog: "Мэдээлэл нэмнэ",
    branch: generation === 0 ? "Үндэс" : `G${generation}`,
    bio: "Энэ хэсэгт тухайн хүний намтар, амьдралын түүх, ажил мэргэжил, гэр бүлийн дурсамжийг оруулна.",
    events: [],
    x: 0,
    y: 0
  };
}

function spouse(id, name, partnerId, generation) {
  return person(id, name, "spouse", [], partnerId, [], generation, "Хань", "Unknown");
}

/* =========================================================
   3. App state
   ========================================================= */
const state = {
  selectedId: null,
  scale: 1,
  offsetX: 0,
  offsetY: 0,
  isDragging: false,
  dragStartX: 0,
  dragStartY: 0,
  dragBaseX: 0,
  dragBaseY: 0,
  bounds: { minX: 0, minY: 0, maxX: 0, maxY: 0, width: 0, height: 0 }
};

const $ = (id) => document.getElementById(id);

/* =========================================================
   4. Layout generation
   ========================================================= */
function calculateLayout() {
  const bloodMap = new Map(familyData.filter(p => p.type === "bloodline").map(p => [p.id, p]));
  const root = getPerson("f1");
  let leafCursor = 0;

  function assignX(node) {
    const children = node.childrenIds.map(id => bloodMap.get(id)).filter(Boolean);
    if (children.length === 0) {
      node.x = leafCursor * CONFIG.nodeGapX;
      leafCursor += 1;
      return node.x;
    }

    const childXs = children.map(assignX);
    node.x = average(childXs);
    return node.x;
  }

  assignX(root);

  const maxGeneration = Math.max(...familyData.filter(p => p.type === "bloodline").map(p => p.generation));
  familyData.filter(p => p.type === "bloodline").forEach(p => {
    p.y = (maxGeneration - p.generation) * CONFIG.levelGapY;
  });

  // Founding spouse beside founder.
  familyData.filter(p => p.type === "spouse").forEach(sp => {
    const partner = getPerson(sp.spouseId);
    if (!partner) return;
    sp.x = partner.x + CONFIG.spouseGap;
    sp.y = partner.y + 5;
  });

  const xs = familyData.map(p => p.x);
  const ys = familyData.map(p => p.y);
  state.bounds.minX = Math.min(...xs) - CONFIG.marginX;
  state.bounds.maxX = Math.max(...xs) + CONFIG.marginX;
  state.bounds.minY = Math.min(...ys) - CONFIG.marginY;
  state.bounds.maxY = Math.max(...ys) + CONFIG.marginY;
  state.bounds.width = state.bounds.maxX - state.bounds.minX;
  state.bounds.height = state.bounds.maxY - state.bounds.minY;

  familyData.forEach(p => {
    p.x = p.x - state.bounds.minX;
    p.y = p.y - state.bounds.minY;
  });

  const canvas = $("treeCanvas");
  canvas.style.width = `${state.bounds.width}px`;
  canvas.style.height = `${state.bounds.height}px`;
}

/* =========================================================
   5. Tree rendering
   ========================================================= */
function renderTree() {
  calculateLayout();
  renderLines();
  renderNodes();
  renderMiniMap();
  fitTreeToView();
}

function renderNodes() {
  const layer = $("nodeLayer");
  layer.innerHTML = "";

  familyData.forEach(person => {
    const node = document.createElement("button");
    node.type = "button";
    node.id = `node-${person.id}`;
    node.className = `person-node ${person.type}`;
    node.style.left = `${person.x}px`;
    node.style.top = `${person.y}px`;
    node.setAttribute("aria-label", person.name);

    node.innerHTML = `
      <div class="portrait">${initials(person.name, person.id)}</div>
      ${person.type === "bloodline" ? `<span class="generation-tag">G${person.generation + 1}</span>` : ""}
      <span class="name-label">${person.name}</span>
    `;

    node.addEventListener("click", event => {
      event.stopPropagation();
      selectPerson(person.id);
    });

    layer.appendChild(node);
  });
}

/* =========================================================
   6. Connection rendering
   ========================================================= */
function renderLines() {
  const svg = $("lineLayer");
  svg.setAttribute("viewBox", `0 0 ${state.bounds.width} ${state.bounds.height}`);
  svg.innerHTML = "";

  familyData.filter(p => p.type === "bloodline").forEach(parent => {
    parent.childrenIds.forEach(childId => {
      const child = getPerson(childId);
      if (!child || child.type !== "bloodline") return;

      const midY = (parent.y + child.y) / 2;
      const path = createSvg("path");
      path.setAttribute("d", `M ${parent.x} ${parent.y - 44} C ${parent.x} ${midY}, ${child.x} ${midY}, ${child.x} ${child.y + 45}`);
      path.setAttribute("class", "blood-line");
      path.dataset.from = parent.id;
      path.dataset.to = child.id;
      svg.appendChild(path);
    });
  });

  familyData.filter(p => p.type === "bloodline" && p.spouseId).forEach(person => {
    const sp = getPerson(person.spouseId);
    if (!sp) return;

    const line = createSvg("line");
    line.setAttribute("x1", person.x + 45);
    line.setAttribute("y1", person.y);
    line.setAttribute("x2", sp.x - 34);
    line.setAttribute("y2", sp.y);
    line.setAttribute("class", "spouse-line");
    line.dataset.from = person.id;
    line.dataset.to = sp.id;
    svg.appendChild(line);
  });
}

/* =========================================================
   7. Gerege card logic
   ========================================================= */
function selectPerson(id) {
  state.selectedId = id;
  highlightBloodline(id);
  renderGeregeCard(id);
}

function renderGeregeCard(id) {
  const person = getPerson(id);
  const spouse = getPerson(person.spouseId);
  const path = relationshipPath(id).map(p => p.name).join(" → ");

  $("cardLayer").innerHTML = `
    <article class="gerege-card" style="left:${person.x}px; top:${person.y + 78}px;">
      <button class="card-close" type="button" onclick="closeCard()">×</button>
      <div class="card-head">
        <div class="card-avatar">${initials(person.name, person.id)}</div>
        <div>
          <h2>${person.name}</h2>
          <p class="relation">${person.relation}</p>
        </div>
      </div>

      <div class="info-grid">
        <p><strong>Төрсөн он:</strong> ${person.birthYear}</p>
        <p><strong>Төрсөн нутаг:</strong> ${person.birthplace}</p>
        <p><strong>Овог:</strong> ${person.ovog}</p>
        <p><strong>Ургийн овог:</strong> ${person.urgiinOvog}</p>
        <p><strong>Хань:</strong> ${spouse ? spouse.name : "—"}</p>
        <p><strong>Хүүхэд:</strong> ${person.childrenIds.length}</p>
      </div>

      <div class="path-box"><strong>Холбоос:</strong><br>${path || person.name}</div>
      <p class="bio">${person.bio}</p>
    </article>
  `;
}

function closeCard() {
  $("cardLayer").innerHTML = "";
  state.selectedId = null;
  clearHighlight();
}

document.addEventListener("click", event => {
  if (!event.target.closest(".gerege-card") && !event.target.closest(".person-node")) {
    closeCard();
  }
});

/* =========================================================
   8. Search logic
   ========================================================= */
function searchPerson() {
  const query = $("searchInput").value.trim().toLowerCase();
  if (!query) return;

  const found = familyData.find(p =>
    p.name.toLowerCase().includes(query) ||
    p.id.toLowerCase().includes(query)
  );

  if (!found) {
    alert("Хүн олдсонгүй.");
    return;
  }

  centerOnPerson(found.id);
  selectPerson(found.id);
}

/* =========================================================
   9. Pan and zoom logic
   ========================================================= */
function applyTransform() {
  $("treeCanvas").style.transform = `translate(${state.offsetX}px, ${state.offsetY}px) scale(${state.scale})`;
  updateMiniMapView();
}

function fitTreeToView() {
  const viewport = $("treeViewport");
  const scaleX = viewport.clientWidth / state.bounds.width;
  const scaleY = viewport.clientHeight / state.bounds.height;
  state.scale = clamp(Math.min(scaleX, scaleY) * 0.92, CONFIG.minScale, 1);
  state.offsetX = (viewport.clientWidth - state.bounds.width * state.scale) / 2;
  state.offsetY = (viewport.clientHeight - state.bounds.height * state.scale) / 2;
  applyTransform();
}

function centerOnPerson(id) {
  const person = getPerson(id);
  const viewport = $("treeViewport");
  if (!person) return;

  state.offsetX = viewport.clientWidth / 2 - person.x * state.scale;
  state.offsetY = viewport.clientHeight / 2 - person.y * state.scale;
  applyTransform();
}

function zoomBy(delta) {
  const viewport = $("treeViewport");
  const oldScale = state.scale;
  const nextScale = clamp(state.scale + delta, CONFIG.minScale, CONFIG.maxScale);

  const centerX = (viewport.clientWidth / 2 - state.offsetX) / oldScale;
  const centerY = (viewport.clientHeight / 2 - state.offsetY) / oldScale;

  state.scale = nextScale;
  state.offsetX = viewport.clientWidth / 2 - centerX * nextScale;
  state.offsetY = viewport.clientHeight / 2 - centerY * nextScale;
  applyTransform();
}

function startDrag(event) {
  if (event.target.closest(".person-node") || event.target.closest(".gerege-card")) return;
  state.isDragging = true;
  state.dragStartX = event.clientX;
  state.dragStartY = event.clientY;
  state.dragBaseX = state.offsetX;
  state.dragBaseY = state.offsetY;
  $("treeViewport").classList.add("dragging");
}

function dragMove(event) {
  if (!state.isDragging) return;
  state.offsetX = state.dragBaseX + event.clientX - state.dragStartX;
  state.offsetY = state.dragBaseY + event.clientY - state.dragStartY;
  applyTransform();
}

function endDrag() {
  state.isDragging = false;
  $("treeViewport").classList.remove("dragging");
}

/* =========================================================
   10. Highlight logic
   ========================================================= */
function highlightBloodline(id) {
  const activeIds = new Set(ancestorIds(id));
  activeIds.add(id);

  const selected = getPerson(id);
  if (selected?.type === "spouse" && selected.spouseId) {
    activeIds.add(selected.spouseId);
    ancestorIds(selected.spouseId).forEach(pid => activeIds.add(pid));
  }

  document.querySelectorAll(".person-node").forEach(node => {
    const nodeId = node.id.replace("node-", "");
    node.classList.toggle("dimmed", !activeIds.has(nodeId));
    node.classList.toggle("highlighted", activeIds.has(nodeId));
  });

  document.querySelectorAll(".blood-line, .spouse-line").forEach(line => {
    const active = activeIds.has(line.dataset.from) && activeIds.has(line.dataset.to);
    line.classList.toggle("line-dimmed", !active);
    line.classList.toggle("line-highlighted", active && line.classList.contains("blood-line"));
  });
}

function clearHighlight() {
  document.querySelectorAll(".person-node").forEach(n => n.classList.remove("dimmed", "highlighted"));
  document.querySelectorAll(".blood-line, .spouse-line").forEach(l => l.classList.remove("line-dimmed", "line-highlighted"));
}

function ancestorIds(id) {
  const p = getPerson(id);
  if (!p) return [];

  const bloodParentId = p.parentIds.find(parentId => getPerson(parentId)?.type === "bloodline");
  if (!bloodParentId) return [];

  return [...ancestorIds(bloodParentId), bloodParentId];
}

function relationshipPath(id) {
  return [...ancestorIds(id), id].map(getPerson).filter(Boolean);
}

/* =========================================================
   11. Mini-map logic
   ========================================================= */
function renderMiniMap() {
  const mini = $("miniNodes");
  mini.innerHTML = "";

  familyData.filter(p => p.type === "bloodline").forEach(p => {
    const dot = document.createElement("span");
    dot.className = "mini-dot";
    dot.style.left = `${(p.x / state.bounds.width) * 210}px`;
    dot.style.top = `${(p.y / state.bounds.height) * 140}px`;
    mini.appendChild(dot);
  });
}

function updateMiniMapView() {
  const view = $("miniView");
  const viewport = $("treeViewport");

  const visibleW = viewport.clientWidth / (state.bounds.width * state.scale) * 210;
  const visibleH = viewport.clientHeight / (state.bounds.height * state.scale) * 140;
  const left = (-state.offsetX / (state.bounds.width * state.scale)) * 210;
  const top = (-state.offsetY / (state.bounds.height * state.scale)) * 140;

  view.style.width = `${clamp(visibleW, 18, 210)}px`;
  view.style.height = `${clamp(visibleH, 18, 140)}px`;
  view.style.transform = `translate(${clamp(left, 0, 210)}px, ${clamp(top, 0, 140)}px)`;
}

/* =========================================================
   12. Utility functions
   ========================================================= */
function getPerson(id) {
  return familyData.find(p => p.id === id);
}

function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function average(numbers) {
  return numbers.reduce((sum, n) => sum + n, 0) / numbers.length;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function createSvg(tag) {
  return document.createElementNS("http://www.w3.org/2000/svg", tag);
}

function initials(name, fallback) {
  const clean = name.replace(/[0-9\-]/g, "").trim();
  if (!clean || clean.includes("Үүсгэн")) return fallback.toUpperCase();
  return clean.split(/\s+/).map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

function tryPassword() {
  const value = $("passwordInput").value.trim();
  if (value === APP_PASSWORD) {
    $("passwordScreen").classList.add("hidden");
    $("app").classList.remove("hidden");
    setTimeout(renderTree, 60);
  } else {
    $("passwordError").classList.add("show");
  }
}

function bindEvents() {
  $("enterButton").addEventListener("click", tryPassword);
  $("passwordInput").addEventListener("keydown", event => {
    if (event.key === "Enter") tryPassword();
  });

  $("searchButton").addEventListener("click", searchPerson);
  $("searchInput").addEventListener("keydown", event => {
    if (event.key === "Enter") searchPerson();
  });

  $("zoomInButton").addEventListener("click", () => zoomBy(0.12));
  $("zoomOutButton").addEventListener("click", () => zoomBy(-0.12));
  $("fitButton").addEventListener("click", fitTreeToView);
  $("resetButton").addEventListener("click", () => centerOnPerson("f1"));
  $("printButton").addEventListener("click", () => window.print());

  const viewport = $("treeViewport");
  viewport.addEventListener("pointerdown", startDrag);
  window.addEventListener("pointermove", dragMove);
  window.addEventListener("pointerup", endDrag);

  viewport.addEventListener("wheel", event => {
    event.preventDefault();
    zoomBy(event.deltaY > 0 ? -0.08 : 0.08);
  }, { passive: false });

  window.addEventListener("resize", () => {
    if (!$("app").classList.contains("hidden")) fitTreeToView();
  });
}

bindEvents();
window.closeCard = closeCard;

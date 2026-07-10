/* =========================================================
   1. Config / password
   ========================================================= */
const APP_PASSWORD = "Лочин";

const CONFIG = {
  nodeGapX: 165,
  levelGapY: 250,
  spouseGap: 86,
  marginX: 360,
  marginY: 260,
  minScale: 0.26,
  maxScale: 1.8
};

/* =========================================================
   2. Family data
   - 2 founders
   - 11 children
   - one known detailed branch: Өлзийбүрэн
   ========================================================= */
const familyData = [
  blood("f1", "Үүсгэн байгуулагч", [ ], "f2", ["c1","c2","c3","c4","c5","c6","c7","c8","c9","c10","c11"], 0, "Өвөг"),
  spouseNode("f2", "Үүсгэн хань", "f1", 0),

  blood("c1", "1-р хүүхэд", ["f1","f2"], "", [], 1, "Хүүхэд"),
  blood("c2", "2-р хүүхэд", ["f1","f2"], "", [], 1, "Хүүхэд"),
  blood("c3", "3-р хүүхэд", ["f1","f2"], "", [], 1, "Хүүхэд"),
  blood("c4", "4-р хүүхэд", ["f1","f2"], "", [], 1, "Хүүхэд"),
  blood("c5", "5-р хүүхэд", ["f1","f2"], "", [], 1, "Хүүхэд"),
  blood("c6", "6-р хүүхэд", ["f1","f2"], "", [], 1, "Хүүхэд"),
  blood("c7", "7-р хүүхэд", ["f1","f2"], "", [], 1, "Хүүхэд"),
  blood("c8", "8-р хүүхэд", ["f1","f2"], "", [], 1, "Хүүхэд"),
  blood("c9", "9-р хүүхэд", ["f1","f2"], "", [], 1, "Хүүхэд"),
  blood("c10", "10-р хүүхэд", ["f1","f2"], "", [], 1, "Хүүхэд"),
  blood("c11", "Өлзийбүрэн", ["f1","f2"], "c11s", ["b1","b2","b3","b4","b5","b6","b7","b8"], 1, "Хүүхэд"),
  spouseNode("c11s", "Гэрэл", "c11", 1),

  blood("b1", "Бүжинлхам", ["c11"], "b1s", ["b1a","b1b"], 2, "1"),
  spouseNode("b1s", "Одгэрэл", "b1", 2),
  blood("b1a", "Элбэг", ["b1"], "b1as", ["b1a1","b1a2"], 3, "1.1"),
  spouseNode("b1as", "Дэнсмаа", "b1a", 3),
  blood("b1a1", "Билэгт", ["b1a"], "", [], 4, "1.1.1"),
  blood("b1a2", "Сосорбарам", ["b1a"], "", [], 4, "1.1.2"),
  blood("b1b", "Элбэгсайхан", ["b1"], "b1bs", ["b1b1"], 3, "1.2"),
  spouseNode("b1bs", "Даашка", "b1b", 3),
  blood("b1b1", "Хүүхэд", ["b1b"], "", [], 4, "1.2.1"),

  blood("b2", "Рэгжидмаа", ["c11"], "b2s", ["b2a","b2b"], 2, "2"),
  spouseNode("b2s", "Буяннэмэх", "b2", 2),
  blood("b2a", "Мөнхцэцэг", ["b2"], "", ["b2a1"], 3, "2.1"),
  blood("b2a1", "Минжин", ["b2a"], "", [], 4, "2.1.1"),
  blood("b2b", "Мөнхцолмон", ["b2"], "", [], 3, "2.2"),

  blood("b3", "Лувсан-Ёндон", ["c11"], "b3s", ["b3a","b3b"], 2, "3"),
  spouseNode("b3s", "Анхилмаа", "b3", 2),
  blood("b3a", "Төрболд", ["b3"], "", [], 3, "3.1"),
  blood("b3b", "Хүслэн", ["b3"], "", [], 3, "3.2"),

  blood("b4", "Дайдийноров", ["c11"], "b4s", ["b4a","b4b","b4c"], 2, "4"),
  spouseNode("b4s", "Наранбаяр", "b4", 2),
  blood("b4a", "Ууган-Эрдэнэ", ["b4"], "", [], 3, "4.1"),
  blood("b4b", "Нандин-Эрдэнэ", ["b4"], "", [], 3, "4.2"),
  blood("b4c", "Мөнх-Эрдэнэ", ["b4"], "", [], 3, "4.3"),

  blood("b5", "Амаагомбо", ["c11"], "b5s", ["b5a","b5b","b5c"], 2, "5"),
  spouseNode("b5s", "Номинчулуун", "b5", 2),
  blood("b5a", "Ууганбаяр", ["b5"], "", [], 3, "5.1"),
  blood("b5b", "Мишээл", ["b5"], "", [], 3, "5.2"),
  blood("b5c", "Жамьяандорж", ["b5"], "", [], 3, "5.3"),

  blood("b6", "Агааноров", ["c11"], "b6s", ["b6a","b6b"], 2, "6"),
  spouseNode("b6s", "Цэцэгдолгор", "b6", 2),
  blood("b6a", "Энхбилгүүн", ["b6"], "", [], 3, "6.1"),
  blood("b6b", "Энхгэрэл", ["b6"], "", [], 3, "6.2"),

  blood("b7", "Бумбаноров", ["c11"], "b7s", ["b7a"], 2, "7"),
  spouseNode("b7s", "Энхзул", "b7", 2),
  blood("b7a", "Галбадрах", ["b7"], "", [], 3, "7.1"),

  blood("b8", "Отгон", ["c11"], "b8s", ["b8a","b8b"], 2, "8"),
  spouseNode("b8s", "Бат-Эрдэнэ", "b8", 2),
  blood("b8a", "Маргад", ["b8"], "", [], 3, "8.1"),
  blood("b8b", "Марал", ["b8"], "", [], 3, "8.2")
];

function blood(id, name, parentIds, spouseId, childrenIds, generation, relation) {
  return {
    id,
    name,
    type: "bloodline",
    parentIds,
    spouseId,
    childrenIds,
    generation,
    relation,
    birthYear: "Мэдээлэл оруулна",
    birthplace: "Монгол",
    urgiinOvog: "Боржигон",
    phoneNumber: "Мэдээлэл оруулна",
    bio: "Энэ хэсэгт тухайн хүний намтар, дурсамж, ажил мэргэжил, амьдралын түүхийг оруулна.",
    x: 0,
    y: 0
  };
}

function spouseNode(id, name, spouseId, generation) {
  return {
    id,
    name,
    type: "spouse",
    parentIds: [],
    spouseId,
    childrenIds: [],
    generation,
    relation: "Хань",
    birthYear: "Мэдээлэл оруулна",
    birthplace: "Монгол",
    urgiinOvog: "-",
    phoneNumber: "Мэдээлэл оруулна",
    bio: "Энэ хэсэгт тухайн хүний мэдээллийг дараа нь нэмж болно.",
    x: 0,
    y: 0
  };
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
  dragPointerId: null,
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
    if (!children.length) {
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

  familyData.filter(p => p.type === "spouse").forEach(sp => {
    const partner = getPerson(sp.spouseId);
    if (!partner) return;
    sp.x = partner.x + CONFIG.spouseGap;
    sp.y = partner.y + 2;
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
    const children = parent.childrenIds.map(getPerson).filter(p => p && p.type === "bloodline");
    if (!children.length) return;

    const parentTopY = parent.y - nodeRadius(parent) - 6;
    const childBottomYs = children.map(child => child.y + nodeRadius(child) + 6);
    const busY = (parentTopY + Math.min(...childBottomYs)) / 2;

    const trunk = createSvg("line");
    trunk.setAttribute("x1", parent.x);
    trunk.setAttribute("y1", parentTopY);
    trunk.setAttribute("x2", parent.x);
    trunk.setAttribute("y2", busY);
    trunk.setAttribute("class", "blood-line trunk-line");
    trunk.dataset.parent = parent.id;
    svg.appendChild(trunk);

    if (children.length > 1) {
      const bus = createSvg("line");
      bus.setAttribute("x1", Math.min(...children.map(c => c.x)));
      bus.setAttribute("y1", busY);
      bus.setAttribute("x2", Math.max(...children.map(c => c.x)));
      bus.setAttribute("y2", busY);
      bus.setAttribute("class", "blood-line bus-line");
      bus.dataset.parent = parent.id;
      svg.appendChild(bus);
    }

    children.forEach(child => {
      const childBottomY = child.y + nodeRadius(child) + 6;
      const branch = createSvg("line");
      branch.setAttribute("x1", child.x);
      branch.setAttribute("y1", busY);
      branch.setAttribute("x2", child.x);
      branch.setAttribute("y2", childBottomY);
      branch.setAttribute("class", "blood-line child-line");
      branch.dataset.from = parent.id;
      branch.dataset.to = child.id;
      svg.appendChild(branch);
    });
  });

  familyData.filter(p => p.type === "bloodline" && p.spouseId).forEach(person => {
    const sp = getPerson(person.spouseId);
    if (!sp) return;
    const line = createSvg("line");
    line.setAttribute("x1", person.x + nodeRadius(person) + 6);
    line.setAttribute("y1", person.y);
    line.setAttribute("x2", sp.x - nodeRadius(sp) - 6);
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
  const path = relationshipPath(id).map(p => p.name).join(" → ");

  $("cardLayer").innerHTML = `
    <article class="gerege-card" style="left:${person.x}px; top:${person.y + 84}px;">
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
        <p><strong>Ургийн овог:</strong> ${person.urgiinOvog}</p>
        <p><strong>Утасны дугаар:</strong> ${person.phoneNumber}</p>
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
    p.name.toLowerCase().includes(query) || p.id.toLowerCase().includes(query)
  );

  if (!found) {
    alert("Ийм нэртэй хүн олдсонгүй.");
    return;
  }

  centerOnPerson(found.id);
  selectPerson(found.id);
}

/* =========================================================
   9. Pan and zoom logic
   ========================================================= */
function applyTransform() {
  $("treeCanvas").style.transform = `translate3d(${state.offsetX}px, ${state.offsetY}px, 0) scale(${state.scale})`;
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
  state.dragPointerId = event.pointerId;
  state.dragStartX = event.clientX;
  state.dragStartY = event.clientY;
  state.dragBaseX = state.offsetX;
  state.dragBaseY = state.offsetY;
  $("treeViewport").classList.add("dragging");
  $("treeViewport").setPointerCapture(event.pointerId);
  event.preventDefault();
}

function dragMove(event) {
  if (!state.isDragging || event.pointerId !== state.dragPointerId) return;
  state.offsetX = state.dragBaseX + event.clientX - state.dragStartX;
  state.offsetY = state.dragBaseY + event.clientY - state.dragStartY;
  applyTransform();
}

function endDrag(event) {
  if (!state.isDragging || event.pointerId !== state.dragPointerId) return;
  state.isDragging = false;
  state.dragPointerId = null;
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
    let active = false;
    if (line.dataset.from && line.dataset.to) {
      active = activeIds.has(line.dataset.from) && activeIds.has(line.dataset.to);
    } else if (line.dataset.parent) {
      active = activeIds.has(line.dataset.parent);
    }
    line.classList.toggle("line-dimmed", !active);
    line.classList.toggle("line-highlighted", active && line.classList.contains("blood-line"));
  });
}

function clearHighlight() {
  document.querySelectorAll(".person-node").forEach(node => node.classList.remove("dimmed", "highlighted"));
  document.querySelectorAll(".blood-line, .spouse-line").forEach(line => line.classList.remove("line-dimmed", "line-highlighted"));
}

function ancestorIds(id) {
  const person = getPerson(id);
  if (!person) return [];
  const bloodParentId = person.parentIds.find(parentId => getPerson(parentId)?.type === "bloodline");
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
  return familyData.find(person => person.id === id);
}

function average(numbers) {
  return numbers.reduce((sum, value) => sum + value, 0) / numbers.length;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function createSvg(tag) {
  return document.createElementNS("http://www.w3.org/2000/svg", tag);
}

function nodeRadius(person) {
  return person.type === "bloodline" ? 41 : 29;
}

function initials(name, fallback) {
  const cleaned = name.replace(/[^A-Za-zА-Яа-яӨөҮүЁё\s-]/g, "").trim();
  if (!cleaned) return fallback.toUpperCase();
  return cleaned.split(/\s+/).map(part => part[0]).join("").slice(0, 2).toUpperCase();
}

function tryPassword() {
  const value = $("passwordInput").value.trim();
  if (value === APP_PASSWORD) {
    $("passwordScreen").classList.add("hidden");
    $("app").classList.remove("hidden");
    setTimeout(renderTree, 40);
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
  $("resetButton").addEventListener("click", () => centerOnPerson("c11"));
  $("printButton").addEventListener("click", () => window.print());

  const viewport = $("treeViewport");
  viewport.addEventListener("pointerdown", startDrag);
  viewport.addEventListener("pointermove", dragMove);
  viewport.addEventListener("pointerup", endDrag);
  viewport.addEventListener("pointercancel", endDrag);
  viewport.addEventListener("lostpointercapture", () => {
    state.isDragging = false;
    state.dragPointerId = null;
    viewport.classList.remove("dragging");
  });

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

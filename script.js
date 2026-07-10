/* 1. Family data */
const APP_PASSWORD = "Лочин";

function createFamilyData() {
  const maleNames = ["Бат-Эрдэнэ", "Тэмүүлэн", "Энхбаяр", "Мөнх-Оргил", "Ганзориг", "Билгүүн", "Төгөлдөр", "Сүхбат", "Наранбаатар", "Алтангэрэл", "Хүслэн", "Энхтөр", "Одбаяр", "Баярсайхан", "Тэнүүн"];
  const femaleNames = ["Сарантуяа", "Ариунзаяа", "Оюун", "Номин", "Анужин", "Хулан", "Мишээл", "Энхжин", "Солонго", "Мөнхцэцэг", "Туул", "Уянга", "Сувд", "Ану", "Гэрэл"];
  const provinces = ["Архангай", "Өвөрхангай", "Булган", "Хэнтий", "Дорноговь", "Улаанбаатар", "Дархан-Уул", "Сэлэнгэ", "Хөвсгөл"];
  const branchNames = ["Founder", "Blue", "Red", "Green"];
  const people = [];
  const bloodByGen = [["p001"], [], [], [], [], []];
  let next = 1;
  const id = () => `p${String(next++).padStart(3, "0")}`;
  const initials = (name) => name.split(/[\s-]/).map(w => w[0]).join("").slice(0,2).toUpperCase();

  function addPerson({ name, gender, type, generation, parentIds = [], spouseId = "", branch = "Founder", birthYear }) {
    const personId = id();
    people.push({
      id: personId,
      name,
      initials: initials(name),
      gender,
      type,
      parentIds,
      spouseId,
      childrenIds: [],
      generation,
      birthYear: String(birthYear || (1948 + generation * 25 + Math.floor(Math.random() * 8))),
      birthplace: provinces[(people.length + generation) % provinces.length] + ", Монгол",
      ovog: generation < 2 ? "Боржигон" : ["Боржигон", "Хиад", "Олхонууд", "Тайж"][people.length % 4],
      urgiinOvog: "Алтан Удам",
      branch,
      relation: generation === 0 ? "Үүсгэн байгуулагч" : generation === 1 ? "Хүү / Охин" : generation === 2 ? "Ач / Зээ" : "Удам",
      bio: `${name} нь ${branch} мөчрийн төлөөлөл. Энэ хэсэгт тухайн хүний амьдралын түүх, ажил мэргэжил, гэр бүлийн дурсамжийг бичнэ.`,
      photos: { portrait: "", childhood: "", wedding: "", family: "" },
      events: [
        { year: String((birthYear || 1950) + 20), title: "Family milestone", description: "Гэр бүлийн чухал үйл явдал." }
      ],
      x: 0,
      y: 0
    });
    return personId;
  }

  // Two original founders: one bloodline founder + spouse.
  const founder = addPerson({ name: "Лочин", gender: "male", type: "bloodline", generation: 0, birthYear: 1948, branch: "Founder" });
  const founderSpouse = addPerson({ name: "Саран", gender: "female", type: "spouse", generation: 0, birthYear: 1952, branch: "Founder" });
  get(founder).spouseId = founderSpouse;
  get(founderSpouse).spouseId = founder;

  function get(personId) { return people.find(p => p.id === personId); }

  // Create 50 bloodline people total and 50 spouses total = 100 people.
  const genCounts = [3, 7, 13, 18, 8];
  let nameIndex = 0;
  genCounts.forEach((count, genIndex) => {
    const generation = genIndex + 1;
    const previousBlood = generation === 1 ? [founder] : bloodByGen[generation - 1];
    for (let i = 0; i < count; i++) {
      const parentBloodId = previousBlood[i % previousBlood.length];
      const parent = get(parentBloodId);
      const parentSpouseId = parent.spouseId;
      const gender = (i + generation) % 2 === 0 ? "male" : "female";
      const name = gender === "male" ? maleNames[nameIndex % maleNames.length] : femaleNames[nameIndex % femaleNames.length];
      const branch = generation === 1 ? branchNames[(i % 3) + 1] : parent.branch;
      const childId = addPerson({ name: `${name} ${generation}-${i + 1}`, gender, type: "bloodline", generation, parentIds: [parentBloodId, parentSpouseId], branch, birthYear: 1948 + generation * 24 + (i % 8) });
      const spouseGender = gender === "male" ? "female" : "male";
      const spouseName = spouseGender === "male" ? maleNames[(nameIndex + 4) % maleNames.length] : femaleNames[(nameIndex + 4) % femaleNames.length];
      const spouseId = addPerson({ name: `${spouseName} spouse ${generation}-${i + 1}`, gender: spouseGender, type: "spouse", generation, parentIds: [], branch, birthYear: 1950 + generation * 24 + (i % 8) });
      get(childId).spouseId = spouseId;
      get(spouseId).spouseId = childId;
      parent.childrenIds.push(childId);
      if (parentSpouseId) get(parentSpouseId).childrenIds.push(childId);
      bloodByGen[generation].push(childId);
      nameIndex++;
    }
  });

  return people;
}

let familyData = createFamilyData();

/* 2. Language text */
const translations = {
  mn: {
    entryTitle: "Монгол Ургийн Мод", entrySubtitle: "Гэр бүлийн түүх рүү нэвтрэх", enterButton: "Нэвтрэх", wrongPassword: "Нууц үг буруу байна.",
    title: "Монгол Ургийн Мод", subtitle: "Үндэснээс мөчир хүртэл ургах гэр бүлийн холбоо", search: "Хайх", treeView: "Мод", timelineView: "Он цаг", reset: "Reset", addChild: "+ Хүүхэд", addSpouse: "+ Хань", addParent: "+ Эцэг/эх", downloadPng: "PNG", downloadPdf: "PDF", print: "Хэвлэх", adminNote: "Одоогоор demo. Байнгын хадгалах бол script.js дотор засна.", noPerson: "Эхлээд хүн сонгоно уу."
  },
  en: {
    entryTitle: "Mongolian Family Tree", entrySubtitle: "Enter the family history", enterButton: "Enter", wrongPassword: "Wrong password.",
    title: "Mongolian Family Tree", subtitle: "A family line growing from roots to branches", search: "Search", treeView: "Tree View", timelineView: "Timeline View", reset: "Reset", addChild: "+ Child", addSpouse: "+ Spouse", addParent: "+ Parent", downloadPng: "PNG", downloadPdf: "PDF", print: "Print", adminNote: "Front-end demo only. Edit script.js to save permanently.", noPerson: "Select a person first."
  }
};

/* 3. App state */
const state = { language: "mn", selectedId: null, scale: 1, panX: 0, panY: 0, maxGeneration: 5, isDragging: false, dragStartX: 0, dragStartY: 0 };
const tree = { width: 5600, height: 2700, top: 180, bottom: 2460, leafGap: 175 };
const $ = (id) => document.getElementById(id);

/* 4. Tree rendering */
function renderTree() {
  calculateLayout();
  renderLines();
  renderNodes();
  renderMiniMap();
  centerOnPerson("p001", false);
}

function calculateLayout() {
  const people = familyData;
  const blood = people.filter(p => p.type === "bloodline");
  const bloodMap = new Map(blood.map(p => [p.id, p]));
  const leaves = blood.filter(p => p.childrenIds.length === 0);
  let cursor = 420;

  function assignX(person) {
    const bloodChildren = person.childrenIds.map(id => bloodMap.get(id)).filter(Boolean);
    if (bloodChildren.length === 0) {
      person.x = cursor;
      cursor += tree.leafGap;
    } else {
      bloodChildren.forEach(assignX);
      person.x = bloodChildren.reduce((sum, child) => sum + child.x, 0) / bloodChildren.length;
    }
  }
  assignX(getPerson("p001"));

  blood.forEach(person => {
    person.y = tree.bottom - person.generation * ((tree.bottom - tree.top) / state.maxGeneration);
  });

  // Spouse sits near partner but does not receive main bloodline positioning.
  people.filter(p => p.type === "spouse").forEach(spouse => {
    const partner = getPerson(spouse.spouseId);
    const direction = partner.gender === "male" ? 1 : -1;
    spouse.x = partner.x + direction * 92;
    spouse.y = partner.y + 4;
  });
}

function renderNodes() {
  const nodeLayer = $("nodeLayer");
  nodeLayer.innerHTML = "";
  familyData.forEach(person => {
    const node = document.createElement("button");
    node.className = `person-node ${person.type} branch-${person.branch.toLowerCase()} ${state.selectedId === person.id ? "highlighted" : ""}`;
    node.id = `node-${person.id}`;
    node.style.left = `${person.x}px`;
    node.style.top = `${person.y}px`;
    node.setAttribute("type", "button");
    node.setAttribute("aria-label", person.name);
    node.innerHTML = `
      <div class="portrait">${person.initials}</div>
      <span class="name-label">${person.name}</span>
      ${person.type === "bloodline" ? `<span class="generation-badge">G${person.generation}</span>` : ""}
    `;
    node.addEventListener("click", (event) => {
      event.stopPropagation();
      selectPerson(person.id);
    });
    nodeLayer.appendChild(node);
  });
}

/* 5. Line rendering */
function renderLines() {
  const svg = $("lineLayer");
  svg.setAttribute("viewBox", `0 0 ${tree.width} ${tree.height}`);
  svg.innerHTML = "";

  familyData.filter(p => p.type === "bloodline").forEach(parent => {
    parent.childrenIds.forEach(childId => {
      const child = getPerson(childId);
      if (!child || child.type !== "bloodline") return;
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      const midY = (parent.y + child.y) / 2;
      path.setAttribute("d", `M ${parent.x} ${parent.y - 50} C ${parent.x} ${midY}, ${child.x} ${midY}, ${child.x} ${child.y + 52}`);
      path.setAttribute("class", `blood-line line-${parent.id}-${child.id}`);
      path.dataset.from = parent.id;
      path.dataset.to = child.id;
      svg.appendChild(path);
    });
  });

  familyData.filter(p => p.type === "bloodline" && p.spouseId).forEach(person => {
    const spouse = getPerson(person.spouseId);
    if (!spouse) return;
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", person.x + (spouse.x > person.x ? 48 : -48));
    line.setAttribute("y1", person.y);
    line.setAttribute("x2", spouse.x + (spouse.x > person.x ? -36 : 36));
    line.setAttribute("y2", spouse.y);
    line.setAttribute("class", "spouse-line");
    line.dataset.from = person.id;
    line.dataset.to = spouse.id;
    svg.appendChild(line);
  });
}

/* 6. Person click handling */
function selectPerson(personId) {
  state.selectedId = personId;
  highlightBloodline(personId);
  renderGeregeCard(personId);
}

document.addEventListener("click", (event) => {
  if (!event.target.closest(".gerege-card") && !event.target.closest(".person-node")) {
    closeCard();
  }
});

/* 7. Gerege card rendering */
function renderGeregeCard(personId) {
  const person = getPerson(personId);
  const partner = getPerson(person.spouseId);
  const cardLayer = $("cardLayer");
  const path = getRelationshipPath(personId).join(" → ");
  cardLayer.innerHTML = `
    <article class="gerege-card" style="left:${person.x}px; top:${person.y + 76}px;">
      <button class="card-close" onclick="closeCard()">×</button>
      <div class="card-portrait">${person.initials}</div>
      <h2>${person.name}</h2>
      <p><strong>${state.language === "mn" ? "Хамаарал" : "Relation"}:</strong> ${person.relation}</p>
      <p><strong>${state.language === "mn" ? "Төрсөн он" : "Birth year"}:</strong> ${person.birthYear}</p>
      <p><strong>${state.language === "mn" ? "Төрсөн нутаг" : "Birthplace"}:</strong> ${person.birthplace}</p>
      <p><strong>Овог:</strong> ${person.ovog} / ${person.urgiinOvog}</p>
      <p><strong>${state.language === "mn" ? "Хань" : "Spouse"}:</strong> ${partner ? partner.name : "-"}</p>
      <p><strong>${state.language === "mn" ? "Хүүхэд" : "Children"}:</strong> ${person.childrenIds.length}</p>
      <div class="relationship-path">${path}</div>
      <p>${person.bio}</p>
      <div class="gallery"><span>Portrait</span><span>Child</span><span>Wedding</span><span>Family</span></div>
    </article>`;
}

function closeCard() { $("cardLayer").innerHTML = ""; }

/* 8. Search logic */
function searchPerson() {
  const query = $("searchInput").value.trim().toLowerCase();
  if (!query) return;
  const found = familyData.find(p => p.name.toLowerCase().includes(query));
  if (!found) return;
  centerOnPerson(found.id, true);
  selectPerson(found.id);
}

function centerOnPerson(personId, animate = true) {
  const person = getPerson(personId);
  const viewport = $("treeViewport");
  if (!person) return;
  viewport.scrollTo({ left: Math.max(0, person.x * state.scale - viewport.clientWidth / 2), top: Math.max(0, person.y * state.scale - viewport.clientHeight / 2), behavior: animate ? "smooth" : "auto" });
}

/* 9. Bloodline highlight logic */
function highlightBloodline(personId) {
  const pathIds = new Set(getAncestorIds(personId));
  pathIds.add(personId);
  const selected = getPerson(personId);
  if (selected?.type === "spouse" && selected.spouseId) pathIds.add(selected.spouseId);

  document.querySelectorAll(".person-node").forEach(node => {
    const id = node.id.replace("node-", "");
    node.classList.toggle("dimmed", !pathIds.has(id) && state.selectedId);
    node.classList.toggle("highlighted", pathIds.has(id));
  });
  document.querySelectorAll(".blood-line, .spouse-line").forEach(line => {
    const active = pathIds.has(line.dataset.from) && pathIds.has(line.dataset.to);
    line.classList.toggle("line-dimmed", !active);
    line.classList.toggle("line-highlighted", active && line.classList.contains("blood-line"));
  });
}

/* 10. Relationship path logic */
function getAncestorIds(personId) {
  const person = getPerson(personId);
  if (!person || person.parentIds.length === 0) return [];
  const bloodParent = person.parentIds.map(getPerson).find(p => p && p.type === "bloodline");
  return bloodParent ? [...getAncestorIds(bloodParent.id), bloodParent.id] : [];
}

function getRelationshipPath(personId) {
  return [...getAncestorIds(personId), personId].map(id => getPerson(id)?.name).filter(Boolean);
}

/* 11. Add person UI logic */
function openAdmin(type) {
  if (!state.selectedId) { alert(translations[state.language].noPerson); return; }
  $("adminTitle").textContent = type === "child" ? "Add Child" : type === "spouse" ? "Add Spouse" : "Add Parent";
  $("adminDialog").showModal();
}

function previewAddPerson() {
  const selected = getPerson(state.selectedId);
  const name = $("adminName").value || "New Person";
  alert(`${name} preview added near ${selected.name}. To save permanently, add this person in the familyData structure inside script.js.`);
}

/* 12. Timeline mode logic */
function renderTimeline() {
  const timeline = $("timelineSection");
  const groups = {};
  familyData.forEach(p => {
    const decade = `${Math.floor(Number(p.birthYear) / 10) * 10}s`;
    groups[decade] ||= [];
    groups[decade].push(p);
  });
  timeline.innerHTML = Object.keys(groups).sort().map(decade => `
    <div class="timeline-group">
      <h2>${decade}</h2>
      <div class="timeline-people">
        ${groups[decade].map(p => `<button class="timeline-person" onclick="showFromTimeline('${p.id}')">${p.name}</button>`).join("")}
      </div>
    </div>`).join("");
}

function showFromTimeline(personId) {
  switchView("tree");
  setTimeout(() => { centerOnPerson(personId, true); selectPerson(personId); }, 80);
}

function switchView(view) {
  const isTree = view === "tree";
  $("treeSection").classList.toggle("hidden", !isTree);
  $("timelineSection").classList.toggle("hidden", isTree);
  $("treeViewBtn").classList.toggle("active", isTree);
  $("timelineViewBtn").classList.toggle("active", !isTree);
  if (!isTree) renderTimeline();
}

/* 13. Mini map logic */
function renderMiniMap() {
  const holder = $("miniMapNodes");
  holder.innerHTML = "";
  familyData.filter(p => p.type === "bloodline").forEach(p => {
    const dot = document.createElement("span");
    dot.className = "mini-dot";
    dot.style.left = `${(p.x / tree.width) * 190}px`;
    dot.style.top = `${(p.y / tree.height) * 120}px`;
    holder.appendChild(dot);
  });
}

function updateMiniMapView() {
  const viewport = $("treeViewport");
  const view = $("miniMapView");
  view.style.left = `${(viewport.scrollLeft / (tree.width * state.scale)) * 190}px`;
  view.style.top = `${(viewport.scrollTop / (tree.height * state.scale)) * 120}px`;
  view.style.width = `${Math.min(190, (viewport.clientWidth / (tree.width * state.scale)) * 190)}px`;
  view.style.height = `${Math.min(120, (viewport.clientHeight / (tree.height * state.scale)) * 120)}px`;
}

/* 14. Export and print logic */
function downloadPNG() {
  alert("PNG export is prepared as a front-end button. For the cleanest image, use Print or browser screenshot after zooming out.");
}
function downloadPDF() { window.print(); }
function printTree() { window.print(); }

/* 15. Utility functions */
function getPerson(id) { return familyData.find(p => p.id === id); }

function applyLanguage(lang) {
  state.language = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang][key]) el.textContent = translations[lang][key];
  });
  $("mnBtn").classList.toggle("active", lang === "mn");
  $("enBtn").classList.toggle("active", lang === "en");
  $("searchInput").placeholder = lang === "mn" ? "Нэр хайх..." : "Search name...";
}

function setScale(nextScale) {
  state.scale = Math.min(1.8, Math.max(.42, nextScale));
  $("treeCanvas").style.transform = `scale(${state.scale})`;
  updateMiniMapView();
}

function bindEvents() {
  $("enterBtn").addEventListener("click", tryPassword);
  $("passwordInput").addEventListener("keydown", e => { if (e.key === "Enter") tryPassword(); });
  $("searchBtn").addEventListener("click", searchPerson);
  $("searchInput").addEventListener("keydown", e => { if (e.key === "Enter") searchPerson(); });
  $("mnBtn").addEventListener("click", () => applyLanguage("mn"));
  $("enBtn").addEventListener("click", () => applyLanguage("en"));
  $("treeViewBtn").addEventListener("click", () => switchView("tree"));
  $("timelineViewBtn").addEventListener("click", () => switchView("timeline"));
  $("zoomInBtn").addEventListener("click", () => setScale(state.scale + .12));
  $("zoomOutBtn").addEventListener("click", () => setScale(state.scale - .12));
  $("resetViewBtn").addEventListener("click", () => { setScale(1); centerOnPerson("p001", true); });
  $("addChildBtn").addEventListener("click", () => openAdmin("child"));
  $("addSpouseBtn").addEventListener("click", () => openAdmin("spouse"));
  $("addParentBtn").addEventListener("click", () => openAdmin("parent"));
  $("adminSaveBtn").addEventListener("click", previewAddPerson);
  $("pngBtn").addEventListener("click", downloadPNG);
  $("pdfBtn").addEventListener("click", downloadPDF);
  $("printBtn").addEventListener("click", printTree);
  $("treeViewport").addEventListener("scroll", updateMiniMapView);
}

function tryPassword() {
  const input = $("passwordInput").value.trim();
  if (input === APP_PASSWORD) {
    $("passwordScreen").classList.add("hidden");
    $("app").classList.remove("hidden");
    setTimeout(() => { renderTree(); updateMiniMapView(); }, 50);
  } else {
    $("passwordError").classList.add("show");
  }
}

bindEvents();
applyLanguage("mn");
window.closeCard = closeCard;
window.showFromTimeline = showFromTimeline;

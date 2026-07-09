// Advanced Mongolian-themed 100-person family tree
// Total people in this starter data = 100
// 2 founders + 49 bloodline descendants + 49 spouses.
// Big gold circles are bloodline people. Smaller silver circles are husbands/wives.

const stage = document.getElementById('treeStage');
const nodesLayer = document.getElementById('nodesLayer');
const connectorLayer = document.getElementById('connectorLayer');
const template = document.getElementById('nodeTemplate');
const treeScroll = document.getElementById('treeScroll');

let zoom = 1;

const firstNames = [
  'Temuulen','Anujin','Bilguun','Sarnai','Tengis','Maral','Tuvshin','Nomin','Erkhes','Ariun',
  'Munkhjin','Yesui','Altan','Khulan','Bilegt','Uyanga','Tulga','Enkhjin','Odgerel','Misheel',
  'Bat-Erdene','Solongo','Chingun','Nomundari','Anar','Sodgerel','Tselmeg','Bayarmaa','Khishig','Mandal',
  'Khuslen','Undral','Orgil','Amina','Enerel','Bodhi','Tsengel','Ermuun','Temuge','Ayalguu'
];
const spouseNames = [
  'Bolor','Dulguun','Khaliun','Munkh','Erdene','Ariuka','Bayar','Zaya','Naraa','Gerel',
  'Tuguldur','Oyuka','Bataa','Enkhee','Miga','Uka','Zolboo','Tsetseg','Bold','Narantuya',
  'Amar','Ujin','Ganaa','Tuya','Dash','Tsetsen','Oyun','Saruul','Tsolmon','Namuun',
  'Jargal','Nomio','Sukh','Anu','Bujin','Bilgee','Tuvshuu','Soko','Mendee','Erka'
];
const familyNames = ['Borjigin','Altan Urag','Khiad','Tugchin','Dariganga','Khalkh','Uriankhai'];

// Layout: older generation near roots at the bottom, younger generation grows higher.
const generations = [
  { y: 2360, count: 1, startX: 1800, gap: 0 },      // two founders are one couple at the root
  { y: 2060, count: 4, startX: 850,  gap: 630 },
  { y: 1700, count: 8, startX: 440,  gap: 420 },
  { y: 1320, count: 12, startX: 320, gap: 285 },
  { y: 930,  count: 14, startX: 270, gap: 235 },
  { y: 545,  count: 9,  startX: 650, gap: 320 },
  { y: 250,  count: 2,  startX: 1480, gap: 640 }
];

const people = [];
const nodes = [];
let bloodId = 0;

function initials(name) {
  return name.split(/[-\s]/).filter(Boolean).slice(0,2).map(w => w[0]).join('').toUpperCase();
}

function makePerson(name, role, generation, gender, x, y, parentId = null, spouse = null, founder = false) {
  const id = `p${++bloodId}`;
  const person = {
    id,
    name,
    role,
    generation,
    gender,
    x,
    y,
    parentId,
    founder,
    spouse: spouse ? {
      id: `${id}s`,
      name: spouse,
      role: gender === 'male' ? 'Wife / Бэр' : 'Husband / Хүргэн',
      generation,
      born: 1945 + generation * 12 + (bloodId % 13),
      birthplace: ['Ulaanbaatar','Arkhangai','Dornogovi','Khuvsgul','Umnugovi','Darkhan'][bloodId % 6]
    } : null,
    familyName: familyNames[bloodId % familyNames.length],
    born: 1940 + generation * 14 + (bloodId % 16),
    birthplace: ['Ulaanbaatar','Kharkhorin','Gobi','Khangai','Selenge','Dornod'][bloodId % 6],
    note: generation === 0
      ? 'The root of this bloodline. Replace this with real ancestor information.'
      : 'Bloodline descendant. Replace this text with biography, photos, dates, and memories.'
  };
  people.push(person);
  return person;
}

// Founders: 2 people, both big circles connected at the bottom root.
const founderA = makePerson('Baatar', 'Founder / Өвөг', 0, 'male', 1715, generations[0].y, null, null, true);
const founderB = makePerson('Saran', 'Founder / Эмэг', 0, 'female', 1885, generations[0].y, null, null, true);
founderA.partnerId = founderB.id;
founderB.partnerId = founderA.id;

let previousGen = [founderA, founderB];

for (let g = 1; g < generations.length; g++) {
  const layout = generations[g];
  const currentGen = [];
  for (let i = 0; i < layout.count; i++) {
    const parent = previousGen[i % previousGen.length];
    const gender = (i + g) % 2 === 0 ? 'male' : 'female';
    const name = firstNames[(i + g * 7) % firstNames.length];
    const spouse = spouseNames[(i + g * 9) % spouseNames.length];
    const x = layout.startX + i * layout.gap + ((g % 2) ? (i % 2) * 22 : -(i % 2) * 22);
    const person = makePerson(name, gender === 'male' ? 'Son / Хүү' : 'Daughter / Охин', g, gender, x, layout.y, parent.id, spouse, false);
    currentGen.push(person);
  }
  previousGen = currentGen;
}

function getPerson(id) { return people.find(p => p.id === id); }

function curvePath(x1, y1, x2, y2) {
  const midY = (y1 + y2) / 2;
  return `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;
}

function addPath(d, cls = '') {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', d);
  if (cls) path.setAttribute('class', cls);
  connectorLayer.appendChild(path);
}

function buildConnectors() {
  connectorLayer.innerHTML = '';
  connectorLayer.setAttribute('viewBox', '0 0 3600 2600');

  // Founder root couple line
  addPath(`M ${founderA.x} ${founderA.y} C 1760 2320, 1840 2320, ${founderB.x} ${founderB.y}`, 'root-line');

  // Root rising decorative trunk
  addPath(`M 1800 2510 C 1740 2440, 1720 2410, ${founderA.x} ${founderA.y}`, 'root-line');
  addPath(`M 1800 2510 C 1870 2440, 1890 2410, ${founderB.x} ${founderB.y}`, 'root-line');

  people.forEach(person => {
    if (person.parentId) {
      const parent = getPerson(person.parentId);
      addPath(curvePath(parent.x, parent.y - 55, person.x, person.y + 55), person.generation <= 2 ? 'root-line' : '');
    }
    if (person.spouse) {
      const spouseX = person.x + 82;
      const spouseY = person.y + 32;
      addPath(`M ${person.x + 45} ${person.y + 5} C ${person.x + 70} ${person.y + 10}, ${spouseX - 35} ${spouseY}, ${spouseX} ${spouseY}`, 'spouse-line');
    }
  });
}

function geregeHTML(person, isSpouse = false) {
  const data = isSpouse ? person.spouse : person;
  return `
    <div class="gerege-card">
      <h3>${data.name}</h3>
      <p class="role">${data.role}</p>
      <p><strong>Born:</strong> ${data.born}</p>
      <p><strong>Place:</strong> ${data.birthplace}</p>
      <p><strong>Urag:</strong> ${person.familyName}</p>
      <p>${isSpouse ? 'Married into this family branch. Add real story here.' : person.note}</p>
      <button class="close-mini" type="button">Close</button>
    </div>`;
}

function closeAll() {
  document.querySelectorAll('.node-card.open').forEach(card => card.classList.remove('open'));
  document.querySelectorAll('.portrait.active, .spouse.active').forEach(btn => btn.classList.remove('active'));
}

function openGerege(card, btn, html) {
  const alreadyOpen = card.classList.contains('open') && btn.classList.contains('active');
  closeAll();
  if (alreadyOpen) return;
  const panel = card.querySelector('.gerege-panel');
  panel.innerHTML = html;
  card.classList.add('open');
  btn.classList.add('active');
  panel.querySelector('.close-mini').addEventListener('click', (e) => {
    e.stopPropagation();
    closeAll();
  });
}

function buildNodes() {
  nodesLayer.innerHTML = '';

  people.forEach(person => {
    const clone = template.content.cloneNode(true);
    const card = clone.querySelector('.node-card');
    const portrait = clone.querySelector('.portrait');
    const spouse = clone.querySelector('.spouse');
    const label = clone.querySelector('.label');

    card.style.left = `${person.x}px`;
    card.style.top = `${person.y}px`;
    if (person.founder) card.classList.add('founder');
    if (person.generation >= 5) card.classList.add('young');

    portrait.dataset.id = person.id;
    portrait.querySelector('.initials').textContent = initials(person.name);
    portrait.title = person.name;

    label.textContent = person.founder ? person.name : `${person.name} + ${person.spouse?.name || ''}`;

    portrait.addEventListener('click', (e) => {
      e.stopPropagation();
      openGerege(card, portrait, geregeHTML(person, false));
    });

    if (person.spouse) {
      spouse.querySelector('.initials').textContent = initials(person.spouse.name);
      spouse.title = person.spouse.name;
      spouse.addEventListener('click', (e) => {
        e.stopPropagation();
        openGerege(card, spouse, geregeHTML(person, true));
      });
    } else {
      spouse.style.display = 'none';
    }

    nodesLayer.appendChild(clone);
  });
}

function applyZoom() {
  stage.style.transform = `scale(${zoom})`;
}

document.getElementById('zoomIn').addEventListener('click', () => {
  zoom = Math.min(1.35, zoom + 0.1);
  applyZoom();
});
document.getElementById('zoomOut').addEventListener('click', () => {
  zoom = Math.max(0.55, zoom - 0.1);
  applyZoom();
});
document.getElementById('resetView').addEventListener('click', () => {
  zoom = 1;
  applyZoom();
  treeScroll.scrollTo({ left: 1100, top: 1850, behavior: 'smooth' });
});

document.addEventListener('click', closeAll);

buildConnectors();
buildNodes();
applyZoom();

// Start view near the older/root part of the tree.
window.addEventListener('load', () => {
  treeScroll.scrollTo({ left: 1100, top: 1840, behavior: 'smooth' });
});

/*
  LOGIC NOTE
  This tree is NOT random. It uses a strict descendant layout:
  - One founder couple begins at the root/bottom.
  - Their children are centered above the couple.
  - Each bloodline child may have a spouse attached beside them.
  - Only bloodline descendants continue the main golden branches.
  - Each child group is centered between its parents, like a real family tree diagram.
*/
const WORLD = { width: 9800, height: 3400 };
const Y = { g4: 320, g3: 980, g2: 1650, g1: 2320, g0: 2950 };
const NAMES = ["Temuulen","Anujin","Bilguun","Khulan","Tengis","Saruul","Nomun","Munkh","Tselmeg","Enkhjin","Tuvshin","Maral","Anar","Ujin","Ider","Nandin","Erkhes","Suld","Ariun","Zolboo","Odgerel","Misheel","Khuslen","Tugs","Altan","Soyol","Gerel","Dulguun","Enerel","Tsetsen","Amar","Bolor","Khangai","Bayar","Uran","Selenge","Kherlen","Orgil","Bilegt","Khishig","Tsolmon","Mandakh","Namuun","Tulga","Uyanga","Yesui","Borte","Erdenejargal","Oyun","Dorj","Bat","Saran"];
let allPeople = [];
let bloodNodes = [];
let couples = [];
let childrenOf = {};
let idCounter = 1;
function initials(name){ return name.split(/\s+/).map(x=>x[0]).join('').slice(0,2).toUpperCase(); }
function addPerson({name, gender, blood=true, generation=0, partner=null, parents=null}){
  const id = `p${idCounter++}`;
  const p = { id, name, gender, blood, generation, partner, parents, children: [], birth: 1940 + generation*18 + Math.floor(Math.random()*7), birthplace: ["Ulaanbaatar","Arkhangai","Khovd","Khentii","Dornogovi","Selenge","Umnugovi"][idCounter%7] };
  allPeople.push(p); if(blood) bloodNodes.push(p); return p;
}
function makeCouple(blood, spouse, generation){ couples.push({blood: blood.id, spouse: spouse?.id || null, generation}); blood.partner = spouse?.id || null; if(spouse) spouse.partner = blood.id; }
function addChild(parentBlood, childName, generation){
  const c = addPerson({name: childName, gender: idCounter%2?'Female':'Male', blood:true, generation, parents: parentBlood.id});
  parentBlood.children.push(c.id); childrenOf[parentBlood.id] ||= []; childrenOf[parentBlood.id].push(c.id); return c;
}
function addSpouse(blood, generation){
  const s = addPerson({name: NAMES[(idCounter*3)%NAMES.length] + " spouse", gender: blood.gender === 'Male' ? 'Female':'Male', blood:false, generation});
  makeCouple(blood, s, generation); return s;
}
function buildFamily(){
  const founder1 = addPerson({name:"Altan Founder", gender:"Male", blood:true, generation:0});
  const founder2 = addPerson({name:"Saran Founder", gender:"Female", blood:true, generation:0});
  makeCouple(founder1, founder2, 0);
  // generation 1: 4 children
  const g1 = [];
  for(let i=0;i<4;i++){ const c = addChild(founder1, NAMES[i], 1); addSpouse(c,1); g1.push(c); }
  // generation 2: each g1 couple has 3 children = 12
  const g2 = [];
  g1.forEach((parent, pi)=>{ for(let j=0;j<3;j++){ const c = addChild(parent, NAMES[4+pi*3+j], 2); addSpouse(c,2); g2.push(c); }});
  // generation 3: each g2 couple has 2 children = 24
  const g3 = [];
  g2.forEach((parent, pi)=>{ for(let j=0;j<2;j++){ const c = addChild(parent, NAMES[16+((pi*2+j)%30)], 3); addSpouse(c,3); g3.push(c); }});
  // generation 4: first 18 g3 people have one child = 18. Total people = 2 + 4+4 + 12+12 + 24+24 + 18 = 100.
  for(let i=0;i<18;i++){ addChild(g3[i], NAMES[(40+i)%NAMES.length], 4); }
}
buildFamily();
const peopleById = Object.fromEntries(allPeople.map(p=>[p.id,p]));

// Layout: calculate x positions bottom-up by descendants. If no children, assign next leaf slot.
const positions = {};
let leafX = 450;
const leafGap = 510;
function layoutNode(id){
  const p = peopleById[id];
  const kids = childrenOf[id] || [];
  if(kids.length === 0){ positions[id] = { x: leafX, y: Y[`g${p.generation}`] }; leafX += leafGap; }
  else {
    kids.forEach(layoutNode);
    const xs = kids.map(k=>positions[k].x);
    positions[id] = { x: (Math.min(...xs)+Math.max(...xs))/2, y: Y[`g${p.generation}`] };
  }
  if(p.partner){
    const offset = p.generation === 0 ? 135 : 120;
    const spouseX = positions[id].x + offset;
    positions[p.partner] = { x: spouseX, y: positions[id].y + (p.generation === 0 ? 0 : 8) };
  }
}
layoutNode('p1');
// Founder spouse is second founder and should count as big founding circle.
positions['p2'] = { x: positions['p1'].x + 150, y: Y.g0 };

// Center whole layout in world.
const xs = Object.values(positions).map(p=>p.x); const minX = Math.min(...xs), maxX = Math.max(...xs);
const shiftX = (WORLD.width - (maxX-minX))/2 - minX;
Object.values(positions).forEach(p=>p.x += shiftX);

const svg = document.getElementById('lines');
const nodesEl = document.getElementById('nodes');
const cardsEl = document.getElementById('cards');
svg.setAttribute('viewBox', `0 0 ${WORLD.width} ${WORLD.height}`);
function drawPath(d, cls='tree-line'){
  const path = document.createElementNS('http://www.w3.org/2000/svg','path');
  path.setAttribute('d', d); path.setAttribute('class', cls); svg.appendChild(path);
}
function line(x1,y1,x2,y2,cls='tree-line soft'){ drawPath(`M ${x1} ${y1} L ${x2} ${y2}`, cls); }
function personRadius(p){ return p.blood ? 61 : 45; }
function nodeCenter(id){ const p = peopleById[id], pos = positions[id]; return { x: pos.x, y: pos.y }; }
function coupleMid(parent){ const p = peopleById[parent.id]; const a = nodeCenter(parent.id); if(!p.partner) return a; const b = nodeCenter(p.partner); return { x:(a.x+b.x)/2, y:(a.y+b.y)/2 }; }
function drawConnections(){
  // partner lines
  couples.forEach(c=>{
    const a = nodeCenter(c.blood), b = nodeCenter(c.spouse);
    const y = (a.y+b.y)/2;
    line(a.x+62, y, b.x-45, y, 'tree-line soft');
  });
  // descendant branch groups
  Object.entries(childrenOf).forEach(([pid, kids])=>{
    const parent = peopleById[pid];
    const mid = coupleMid(parent);
    const yJoint = mid.y - 210;
    line(mid.x, mid.y - 62, mid.x, yJoint);
    const childMids = kids.map(kid=>{
      const child = peopleById[kid]; return child.partner ? coupleMid(child) : nodeCenter(kid);
    });
    const min = Math.min(...childMids.map(c=>c.x));
    const max = Math.max(...childMids.map(c=>c.x));
    line(min, yJoint, max, yJoint);
    childMids.forEach(c=> line(c.x, yJoint, c.x, c.y + 62));
  });
}
function renderNodes(){
  [4,3,2,1,0].forEach(g=>{
    const lab = document.createElement('div'); lab.className='generationLabel'; lab.style.top = (Y[`g${g}`]-210)+'px'; lab.textContent = g===0?'ROOT FOUNDERS':`GENERATION ${g}`; nodesEl.appendChild(lab);
  });
  allPeople.forEach(p=>{
    const pos = positions[p.id]; if(!pos) return;
    const el = document.createElement('button');
    el.className = `person ${p.blood ? 'blood':'spouse'}`;
    el.style.left = `${pos.x - personRadius(p)}px`;
    el.style.top = `${pos.y - personRadius(p)}px`;
    el.setAttribute('aria-label', p.name);
    el.innerHTML = `<span class="avatarText"><span class="initials">${initials(p.name)}</span><span class="name">${p.name}</span></span>`;
    el.addEventListener('click', e=>{ e.stopPropagation(); openCard(p.id, el); });
    nodesEl.appendChild(el);
  });
}
function openCard(id, nodeEl){
  document.querySelectorAll('.person.active').forEach(x=>x.classList.remove('active'));
  nodeEl.classList.add('active');
  cardsEl.innerHTML = '';
  const p = peopleById[id], pos = positions[id];
  const partner = p.partner ? peopleById[p.partner]?.name : '—';
  const children = p.children?.length || 0;
  const card = document.createElement('article');
  card.className = 'infoCard';
  card.style.left = `${pos.x - 145}px`;
  card.style.top = `${pos.y + personRadius(p) + 52}px`;
  card.innerHTML = `
    <span class="tag">${p.blood ? 'BLOODLINE' : 'SPOUSE'}</span>
    <h2>${p.name}</h2>
    <p><strong>Generation:</strong> ${p.generation === 0 ? 'Founder root' : p.generation}</p>
    <p><strong>Birth year:</strong> ${p.birth}</p>
    <p><strong>Birthplace:</strong> ${p.birthplace}</p>
    <p><strong>Partner:</strong> ${partner}</p>
    <p><strong>Children:</strong> ${children}</p>
    <p>${p.blood ? 'Main descendant of the founder bloodline. This big golden portrait continues the family branch.' : 'Married into the family. Smaller circle stays attached to the bloodline partner.'}</p>
    <button onclick="this.closest('.infoCard').remove();document.querySelectorAll('.person.active').forEach(x=>x.classList.remove('active'))">Close</button>`;
  cardsEl.appendChild(card);
}
drawConnections(); renderNodes();

// Pan and zoom
const viewport = document.getElementById('viewport');
const world = document.getElementById('world');
let scale = .245, tx = 260, ty = -70;
function apply(){ world.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`; }
function zoom(factor, cx=innerWidth/2, cy=innerHeight/2){
  const old = scale; scale = Math.max(.12, Math.min(1.2, scale*factor));
  tx = cx - (cx - tx) * (scale/old); ty = cy - (cy - ty) * (scale/old); apply();
}
document.getElementById('zoomIn').onclick = ()=>zoom(1.18);
document.getElementById('zoomOut').onclick = ()=>zoom(.84);
document.getElementById('resetView').onclick = ()=>{ scale=.245; tx=260; ty=-70; apply(); };
viewport.addEventListener('wheel', e=>{ e.preventDefault(); zoom(e.deltaY < 0 ? 1.08 : .92, e.clientX, e.clientY); }, {passive:false});
let dragging=false, sx=0, sy=0, startTx=0, startTy=0;
viewport.addEventListener('pointerdown', e=>{ dragging=true; sx=e.clientX; sy=e.clientY; startTx=tx; startTy=ty; viewport.classList.add('dragging'); viewport.setPointerCapture(e.pointerId); });
viewport.addEventListener('pointermove', e=>{ if(!dragging) return; tx = startTx + e.clientX - sx; ty = startTy + e.clientY - sy; apply(); });
viewport.addEventListener('pointerup', e=>{ dragging=false; viewport.classList.remove('dragging'); });
apply();

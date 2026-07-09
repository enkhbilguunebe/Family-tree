const people = {
  grandfather: {
    name: "Bat",
    initial: "Б",
    relation: "Grandfather / Өвөө",
    born: "1948",
    place: "Arkhangai, Mongolia",
    bio: "The elder root of the family. He represents wisdom, discipline, tradition, and the beginning of this family branch."
  },
  grandmother: {
    name: "Saran",
    initial: "С",
    relation: "Grandmother / Эмээ",
    born: "1952",
    place: "Uvurkhangai, Mongolia",
    bio: "A warm and respected elder who keeps family memories, stories, and Mongolian customs alive."
  },
  father: {
    name: "Dorj",
    initial: "Д",
    relation: "Father / Аав",
    born: "1978",
    place: "Ulaanbaatar, Mongolia",
    bio: "A strong middle branch of the tree. He connects the older generation with the younger generation."
  },
  mother: {
    name: "Oyun",
    initial: "О",
    relation: "Mother / Ээж",
    born: "1982",
    place: "Darkhan, Mongolia",
    bio: "A caring family member who supports the children and keeps the household connected."
  },
  child1: {
    name: "Temuulen",
    initial: "Т",
    relation: "Son / Хүү",
    born: "2006",
    place: "Ulaanbaatar, Mongolia",
    bio: "A younger branch growing higher on the family tree. Interested in technology, engineering, and building creative projects."
  },
  child2: {
    name: "Anujin",
    initial: "А",
    relation: "Daughter / Охин",
    born: "2010",
    place: "Ulaanbaatar, Mongolia",
    bio: "A young branch of the family tree. Creative, energetic, and part of the newest generation."
  }
};

const nodes = document.querySelectorAll(".person");
const panel = document.getElementById("infoPanel");
const resetBtn = document.getElementById("resetBtn");

function setInfo(id) {
  const p = people[id];

  nodes.forEach(node => node.classList.toggle("active", node.dataset.person === id));

  document.getElementById("infoName").textContent = p.name;
  document.getElementById("infoPortrait").textContent = p.initial;
  document.getElementById("infoRelation").textContent = p.relation;
  document.getElementById("infoBirth").textContent = p.born;
  document.getElementById("infoPlace").textContent = p.place;
  document.getElementById("infoBio").textContent = p.bio;

  panel.classList.remove("open");
  void panel.offsetWidth;
  panel.classList.add("open");
}

nodes.forEach(node => {
  node.addEventListener("click", () => setInfo(node.dataset.person));
});

resetBtn.addEventListener("click", () => {
  nodes.forEach(node => node.classList.remove("active"));
  document.getElementById("infoName").textContent = "Choose someone";
  document.getElementById("infoPortrait").textContent = "?";
  document.getElementById("infoRelation").textContent = "Click a portrait on the tree.";
  document.getElementById("infoBirth").textContent = "—";
  document.getElementById("infoPlace").textContent = "—";
  document.getElementById("infoBio").textContent = "The information card will slide open from the selected portrait and show details here.";
  panel.classList.remove("open");
});

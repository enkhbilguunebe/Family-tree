const familyData = {
  grandfather: {
    name: "Бат өвөө",
    relation: "Өвөө",
    birth: "1948 он",
    birthplace: "Архангай аймаг",
    description: "Малчин удмын хүн. Гэр бүлийн ахмад гишүүн бөгөөд үр хүүхдүүддээ Монгол ёс заншлыг зааж ирсэн."
  },

  grandmother: {
    name: "Саран эмээ",
    relation: "Эмээ",
    birth: "1952 он",
    birthplace: "Өвөрхангай аймаг",
    description: "Гэр бүлийн халамжтай, уламжлалт хоол унд, зан заншлыг хадгалж ирсэн хүн."
  },

  father: {
    name: "Дорж",
    relation: "Аав",
    birth: "1978 он",
    birthplace: "Улаанбаатар хот",
    description: "Гэр бүлийн түшиг тулгуур. Ажилсаг, хариуцлагатай, хүүхдүүддээ боловсролыг эрхэмлүүлдэг."
  },

  mother: {
    name: "Оюун",
    relation: "Ээж",
    birth: "1982 он",
    birthplace: "Дархан-Уул аймаг",
    description: "Гэр бүлийн халамжит ээж. Хүүхдүүдийн хүмүүжил, боловсролд их анхаардаг."
  },

  child1: {
    name: "Тэмүүлэн",
    relation: "Хүү",
    birth: "2006 он",
    birthplace: "Улаанбаатар хот",
    description: "Технологи, инженерчлэл сонирхдог. Ирээдүйд өөрийн бүтээл хийх зорилготой."
  },

  child2: {
    name: "Анужин",
    relation: "Охин",
    birth: "2010 он",
    birthplace: "Улаанбаатар хот",
    description: "Урлаг, зураг, хөгжим сонирхдог. Гэр бүлийн хамгийн хөгжилтэй гишүүн."
  }
};

function showInfo(personId) {
  const person = familyData[personId];
  const infoCard = document.getElementById("infoCard");

  infoCard.innerHTML = `
    <h2>${person.name}</h2>
    <p><strong>Хамаарал:</strong> ${person.relation}</p>
    <p><strong>Төрсөн он:</strong> ${person.birth}</p>
    <p><strong>Төрсөн газар:</strong> ${person.birthplace}</p>
    <p><strong>Тайлбар:</strong> ${person.description}</p>
  `;
}

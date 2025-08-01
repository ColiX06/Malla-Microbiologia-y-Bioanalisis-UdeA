
const materias = [
  { nombre: "Biología general", creditos: 3, semestre: 1, abre: ["Genética general", "Biología celular"] },
  { nombre: "Fund. Química", creditos: 4, semestre: 1, abre: ["Bioquímica", "Biología celular"] },
  { nombre: "Matemáticas", creditos: 3, semestre: 1, abre: ["Instrumentación", "Bioestadística"] },
  { nombre: "Comunicación", creditos: 2, semestre: 1, abre: ["Socioantropología"] },
  { nombre: "Introducción al programa", creditos: 1, semestre: 1, abre: ["Teoría del conocimiento"] },
  { nombre: "Sistemas TI", creditos: 2, semestre: 1, abre: ["Trabajo grado I"] },
  { nombre: "English I", creditos: 2, semestre: 1, abre: ["English II"] },
  { nombre: "Genética general", creditos: 3, semestre: 2, abre: [] },
  { nombre: "Biología celular", creditos: 4, semestre: 2, abre: ["Biología molecular", "Microbiología", "Morfofisiología I"] },
  { nombre: "Bioquímica", creditos: 4, semestre: 2, abre: ["Biología molecular", "Fisiología microbiana", "Farmacología y Toxicología"] },
  { nombre: "Instrumentación", creditos: 3, semestre: 2, abre: ["Metrología", "Microbiología", "Morfofisiología I"] },
  { nombre: "Socioantropología", creditos: 2, semestre: 2, abre: ["Promoción de la salud"] },
  { nombre: "English II", creditos: 2, semestre: 2, abre: ["English III"] },
];

let completadas = new Set();
let totalCreditos = 0;

const malla = document.getElementById("malla");
const creditosTexto = document.getElementById("creditos");

function crearColumna(semestre, materiasDelSemestre) {
  const columna = document.createElement("div");
  columna.className = "bg-white shadow-md rounded-md p-4 w-60";
  const titulo = document.createElement("h2");
  titulo.className = "text-xl font-semibold text-center text-blue-800 mb-4";
  titulo.textContent = `Semestre ${semestre}`;
  columna.appendChild(titulo);

  materiasDelSemestre.forEach(m => {
    const card = document.createElement("div");
    card.className = "mb-3 p-3 rounded-md text-center bloqueada";
    card.textContent = `${m.nombre}\n(${m.creditos} créditos)`;
    card.dataset.nombre = m.nombre;
    card.dataset.creditos = m.creditos;
    card.dataset.abre = JSON.stringify(m.abre);
    columna.appendChild(card);
  });

  return columna;
}

function renderMalla() {
  malla.innerHTML = "";
  const semestres = [...new Set(materias.map(m => m.semestre))];

  semestres.forEach(s => {
    const materiasSem = materias.filter(m => m.semestre === s);
    const col = crearColumna(s, materiasSem);
    malla.appendChild(col);
  });

  desbloquearIniciales();
}

function desbloquearIniciales() {
  document.querySelectorAll("[data-nombre]").forEach(card => {
    const nombre = card.dataset.nombre;
    const prereqs = materias.find(m => m.nombre === nombre)?.abre || [];
    if (!completadas.has(nombre)) {
      card.classList.remove("completada");
      card.classList.add("desbloqueada");
      card.classList.remove("bloqueada");
      card.addEventListener("click", marcarMateria);
    }
  });
}

function marcarMateria(e) {
  const card = e.currentTarget;
  if (card.classList.contains("completada")) return;

  const nombre = card.dataset.nombre;
  const creditos = parseInt(card.dataset.creditos);
  completadas.add(nombre);
  totalCreditos += creditos;
  card.classList.remove("desbloqueada");
  card.classList.add("completada");
  card.removeEventListener("click", marcarMateria);

  // Desbloquear materias que dependían de esta
  const abiertas = JSON.parse(card.dataset.abre);
  abiertas.forEach(nombreHija => {
    const hija = document.querySelector(`[data-nombre='${nombreHija}']`);
    if (hija && !hija.classList.contains("completada")) {
      hija.classList.remove("bloqueada");
      hija.classList.add("desbloqueada");
      hija.addEventListener("click", marcarMateria);
    }
  });

  creditosTexto.textContent = `Créditos completados: ${totalCreditos} / 180`;
}

renderMalla();

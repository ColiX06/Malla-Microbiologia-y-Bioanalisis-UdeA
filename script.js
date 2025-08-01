const materias = [
  { nombre: "Biología general", id: "bio-gen", creditos: 3, abre: ["genetica", "bio-cel"] },
  { nombre: "Fund. Química", id: "quimica", creditos: 4, abre: ["bioq", "bio-cel"] },
  { nombre: "Matemáticas", id: "mates", creditos: 3, abre: ["instru", "bioest"] },
  { nombre: "Comunicación", id: "comu", creditos: 2, abre: ["socio"] },
  { nombre: "Introducción al programa", id: "intro", creditos: 1, abre: ["teoria"] },
  { nombre: "Sistemas y tecnologías", id: "sistemas", creditos: 2, abre: ["trabajo1"], correquisitos: ["teoria"] },
  { nombre: "English I", id: "eng1", creditos: 2, abre: ["eng2"] },
  { nombre: "Bioquímica", id: "bioq", creditos: 4, abre: ["bio-mol", "fisio-mic", "farma"] },
  { nombre: "Biología celular", id: "bio-cel", creditos: 4, abre: ["bio-mol", "micro", "morfo1"] },
  { nombre: "Instrumentación", id: "instru", creditos: 3, abre: ["metrologia", "micro", "morfo1"] },
  { nombre: "Genética general", id: "genetica", creditos: 3 },
  { nombre: "Socioantropología", id: "socio", creditos: 2, abre: ["promosalud"] },
  { nombre: "English II", id: "eng2", creditos: 2, abre: ["eng3"] },
  { nombre: "Biología molecular", id: "bio-mol", creditos: 3, abre: ["eco", "inmuno", "gen-mic"] },
  { nombre: "Microbiología General", id: "micro", creditos: 4, abre: ["fisio-mic", "gen-mic"] },
  { nombre: "Morfofisiología I", id: "morfo1", creditos: 3, abre: ["morfo2"] },
  { nombre: "Promoción de la salud", id: "promosalud", creditos: 3, abre: ["epidemio"] },
  { nombre: "Teoría del conocimiento", id: "teoria", creditos: 2, abre: ["trabajo1"] },
  { nombre: "English III", id: "eng3", creditos: 2, abre: ["eng4"] },
  { nombre: "Fisiología Microbiana", id: "fisio-mic", creditos: 4, abre: ["eco"] },
  { nombre: "Genética Microbiana", id: "gen-mic", creditos: 3, abre: ["ing-gen"] },
  { nombre: "Morfofisiología II", id: "morfo2", creditos: 4, abre: ["inmuno", "farma", "quim", "hema"] },
  { nombre: "Bioestadística", id: "bioest", creditos: 4, abre: ["eco", "trabajo1", "metrologia", "epidemio"] },
  { nombre: "Formación ciudadana", id: "formacion", creditos: 1, requisitoCreditos: 20 },
  { nombre: "English IV", id: "eng4", creditos: 2, abre: ["eng5"] },
  { nombre: "Ecología Microbiana", id: "eco", creditos: 4, abre: ["mico", "parasito", "viro", "bacterio", "aseg-cal"] },
  { nombre: "Metrología", id: "metrologia", creditos: 3, abre: ["aseg-cal"] },
  { nombre: "Ingeniería genética", id: "ing-gen", creditos: 4 },
  { nombre: "Inmunología", id: "inmuno", creditos: 3, abre: ["parasito", "viro", "bacterio", "aseg-cal"] },
  { nombre: "Construcción trabajo de grado I", id: "trabajo1", creditos: 2, abre: ["trabajo2", "gerencia"] },
  { nombre: "English V", id: "eng5", creditos: 2 },
  { nombre: "Micología", id: "mico", creditos: 3, abre: ["talleres"] },
  { nombre: "Química clínica", id: "quim", creditos: 5, abre: ["admin", "talleres"] },
  { nombre: "Hematología", id: "hema", creditos: 4, abre: ["admin", "talleres"] },
  { nombre: "Farmacología y Toxicología", id: "farma", creditos: 3, abre: ["bacterio"] },
  { nombre: "Construcción trabajo de grado II", id: "trabajo2", creditos: 2 },
  { nombre: "Virología", id: "viro", creditos: 3, abre: ["talleres"] },
  { nombre: "Parasitología", id: "parasito", creditos: 4, abre: ["talleres"] },
  { nombre: "Bacteriología", id: "bacterio", creditos: 4, abre: ["talleres", "ambiente"] },
  { nombre: "Aseguramiento de la calidad", id: "aseg-cal", creditos: 2 },
  { nombre: "Epidemiología", id: "epidemio", creditos: 3, abre: ["salud-pub"] },
  { nombre: "Talleres de laboratorio clínico", id: "talleres", creditos: 3 },
  { nombre: "Principios de administración", id: "admin", creditos: 2 },
  { nombre: "Salud y ambiente", id: "ambiente", creditos: 3 },
  { nombre: "Salud pública", id: "salud-pub", creditos: 3 },
  { nombre: "Gerencia de proyectos y desarrollo empresarial", id: "gerencia", creditos: 2 },
  { nombre: "Ética y bioética", id: "etica", creditos: 2, requisitoCreditos: 52 },
  { nombre: "Sujeto y vida profesional", id: "sujeto", creditos: 2, requisitoCreditos: 120 },
  { nombre: "Práctica profesional I", id: "practica1", creditos: 15, requisitoCreditos: 150 },
  { nombre: "Práctica profesional II", id: "practica2", creditos: 15, requisitoTodo: true }
];

const estadoMaterias = {};
const contenedor = document.getElementById("contenedor");

materias.forEach(m => {
  estadoMaterias[m.id] = false;
  const div = document.createElement("div");
  div.classList.add("materia");
  div.id = m.id;
  div.innerHTML = `
    <h2>${m.nombre}</h2>
    <p>Créditos: ${m.creditos}</p>
    <button onclick="aprobar('${m.id}')" id="btn-${m.id}">Aprobar</button>
  `;
  contenedor.appendChild(div);
});

function aprobar(id) {
  const materia = materias.find(m => m.id === id);
  estadoMaterias[id] = true;
  document.getElementById(id).classList.add("aprobada");
  document.getElementById(`btn-${id}`).disabled = true;

  if (materia.abre) {
    materia.abre.forEach(hijoId => {
      const btn = document.getElementById(`btn-${hijoId}`);
      if (btn) btn.disabled = false;
    });
  }
}

materias.forEach(m => {
  const btn = document.getElementById(`btn-${m.id}`);
  if (!m.abre && !m.correquisitos && !m.requisitoCreditos && !m.requisitoTodo) {
    btn.disabled = false;
  }
});

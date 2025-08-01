
const materias = [
  { id: 1, nombre: "Biología general", creditos: 3, abre: [10,11] },
  { id: 2, nombre: "Fund. Química", creditos: 4, abre: [12,11] },
  { id: 3, nombre: "Matemáticas", creditos: 3, abre: [13,27] },
  { id: 4, nombre: "Comunicación", creditos: 2, abre: [14] },
  { id: 5, nombre: "Introducción al programa", creditos: 1, abre: [15] },
  { id: 6, nombre: "Sistemas TI", creditos: 2, abre: [28] },
  { id: 7, nombre: "English I", creditos: 2, abre: [16] },
  { id: 10, nombre: "Genética general", creditos: 3, abre: [] },
  { id: 11, nombre: "Biología celular", creditos: 4, abre: [17,19,21] },
  { id: 12, nombre: "Bioquímica", creditos: 4, abre: [17,20,35] },
  { id: 13, nombre: "Instrumentación", creditos: 3, abre: [18,19,21] },
  { id: 14, nombre: "Socioantropología", creditos: 2, abre: [22] },
  { id: 15, nombre: "Teoría del conocimiento", creditos: 2, abre: [28] },
  { id: 16, nombre: "English II", creditos: 2, abre: [] },
  { id: 17, nombre: "Biología molecular", creditos: 3, abre: [] },
  { id: 18, nombre: "Metrología", creditos: 3, abre: [] },
  { id: 19, nombre: "Microbiología", creditos: 4, abre: [] },
  { id: 20, nombre: "Fisiología microbiana", creditos: 4, abre: [] },
  { id: 21, nombre: "Morfofisiología I", creditos: 3, abre: [] },
  { id: 22, nombre: "Promoción salud", creditos: 3, abre: [] },
  { id: 27, nombre: "Bioestadística", creditos: 4, abre: [] },
  { id: 28, nombre: "Trabajo grado I", creditos: 2, abre: [] },
];

let materiasCompletadas = new Set();
let totalCreditos = 0;

const nodes = new vis.DataSet(materias.map(m => ({
  id: m.id,
  label: m.nombre + `\n[${m.creditos} créditos]`,
  color: "#cccccc"
})));

const edges = new vis.DataSet([]);
materias.forEach(m => {
  m.abre.forEach(destino => {
    edges.add({ from: m.id, to: destino, arrows: "to" });
  });
});

const container = document.getElementById("network");
const data = { nodes, edges };
const options = {
  layout: { hierarchical: { enabled: true, sortMethod: "directed" } },
  nodes: {
    shape: "box",
    margin: 10,
    font: { multi: true },
    widthConstraint: { maximum: 180 }
  },
  edges: {
    arrows: { to: true },
    smooth: true
  },
  interaction: { hover: true }
};
const network = new vis.Network(container, data, options);

function actualizarCreditos() {
  document.getElementById("creditos").textContent = `Créditos completados: ${totalCreditos} / 180`;
}

function desbloquear(id) {
  const m = materias.find(mat => mat.id === id);
  if (!materiasCompletadas.has(id)) {
    materiasCompletadas.add(id);
    totalCreditos += m.creditos;
    nodes.update({ id: m.id, color: "#80cbc4" });
    m.abre.forEach(dest => {
      const desbloqueada = materias.find(d => d.id === dest);
      if (!materiasCompletadas.has(dest)) {
        nodes.update({ id: dest, color: "#eeeeee" });
      }
    });
    actualizarCreditos();
  }
}

network.on("click", function (params) {
  if (params.nodes.length > 0) {
    const id = params.nodes[0];
    desbloquear(id);
  }
});

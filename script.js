const malla = document.getElementById("malla");
}


function crearRamo(nombre) {
const div = document.createElement("div");
div.className = "ramo";
div.textContent = nombre;


if (estadoAprobado[nombre]) div.classList.add("aprobado");


div.addEventListener("click", () => {
const faltan = verificarRequisitos(nombre);
if (faltan.length && !estadoAprobado[nombre]) {
mostrarMensaje(`Faltan aprobar: ${faltan.join(", ")}`);
return;
}
estadoAprobado[nombre] = !estadoAprobado[nombre];
div.classList.toggle("aprobado");
guardarEstado();
actualizarBloqueos();
actualizarProgreso();
});


return div;
}


function actualizarBloqueos() {
document.querySelectorAll(".ramo").forEach(r => {
const nombre = r.textContent;
const faltan = verificarRequisitos(nombre);
r.classList.remove("bloqueado");
if (!estadoAprobado[nombre] && faltan.length) {
r.classList.add("bloqueado");
}
});
}


function actualizarProgreso() {
const total = document.querySelectorAll(".ramo").length;
const aprobados = document.querySelectorAll(".ramo.aprobado").length;
const porcentaje = Math.round((aprobados / total) * 100);
barra.style.width = porcentaje + "%";
porcentajeTxt.textContent = `Avance: ${porcentaje}%`;
}


function renderMalla() {
for (const ciclo in ramosPorCiclo) {
const col = document.createElement("div");
col.className = "semestre";
const h2 = document.createElement("h2");
h2.textContent = ciclo;
col.appendChild(h2);
ramosPorCiclo[ciclo].forEach(r => col.appendChild(crearRamo(r)));
malla.appendChild(col);
}
}


renderMalla();
actualizarBloqueos();
actualizarProgreso();


// Reset


document.getElementById("reset").addEventListener("click", () => {
localStorage.removeItem("estadoRamos");
location.reload();
});

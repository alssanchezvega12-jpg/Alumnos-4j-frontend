const API_URL = "https://alumnos-4j.onrender.com/alumnos";

// Registrar alumno
document.getElementById("alumnoForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const res = await fetch(API_URL, {
    method: "POST",
    body: formData
  });

  if (res.ok) {
    alert("Alumno registrado con éxito 🎉");
    e.target.reset();
    cargarAlumnos();
  } else {
    alert("Error al registrar alumno ❌");
  }
});

// Cargar alumnos
async function cargarAlumnos() {
  const res = await fetch(API_URL);
  const alumnos = await res.json();

  const lista = document.getElementById("listaAlumnos");
  lista.innerHTML = "";

  alumnos.forEach(alumno => {
    const card = document.createElement("div");
    card.className = "alumno-card";
    card.innerHTML = `
      <h3>${alumno.nombre}</h3>
      <p>Edad: ${alumno.edad}</p>
      <p>Salón: ${alumno.salon}</p>
      ${alumno.foto ? `<img src="${alumno.foto}" alt="Foto">` : ""}
      <div class="card-buttons">
        <button onclick="editarAlumno('${alumno._id}')">✏️ Editar</button>
        <button onclick="eliminarAlumno('${alumno._id}')">🗑️ Eliminar</button>
      </div>
    `;
    lista.appendChild(card);
  });
}

// Eliminar alumno
async function eliminarAlumno(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (res.ok) {
    alert("Alumno eliminado ✅");
    cargarAlumnos();
  } else {
    alert("Error al eliminar alumno ❌");
  }
}

// Editar alumno
async function editarAlumno(id) {
  const nombre = prompt("Nuevo nombre:");
  const edad = prompt("Nueva edad:");
  const salon = prompt("Nuevo salón:");

  if (!nombre || !edad || !salon) {
    alert("Todos los campos son obligatorios ❌");
    return;
  }

  const formData = new FormData();
  formData.append("nombre", nombre);
  formData.append("edad", edad);
  formData.append("salon", salon);

  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    body: formData
  });

  if (res.ok) {
    alert("Alumno actualizado ✏️✅");
    cargarAlumnos();
  } else {
    alert("Error al actualizar alumno ❌");
  }
}

// Inicializar
cargarAlumnos();

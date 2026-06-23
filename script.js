const API_URL = "https://alumnos-4j.onrender.com/alumnos";

// Registrar alumno (con foto)
document.getElementById("alumnoForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: formData
    });

    if (!res.ok) throw new Error("Error al registrar alumno");
    alert("Alumno registrado con éxito 🎉");
    e.target.reset();
    cargarAlumnos();
  } catch (err) {
    alert("❌ " + err.message);
  }
});

// Cargar alumnos
async function cargarAlumnos() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al cargar alumnos");
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
        ${alumno.foto ? `<img src="${alumno.foto}" alt="Foto">` : `<img src="https://via.placeholder.com/150" alt="Foto">`}
        <div class="card-buttons">
          <button onclick="editarAlumno('${alumno._id}')">✏️ Editar</button>
          <button onclick="eliminarAlumno('${alumno._id}')">🗑️ Eliminar</button>
        </div>
      `;
      lista.appendChild(card);
    });
  } catch (err) {
    alert("❌ " + err.message);
  }
}

// Eliminar alumno
async function eliminarAlumno(id) {
  if (!confirm("¿Seguro que deseas eliminar este alumno?")) return;
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al eliminar alumno");
    alert("Alumno eliminado ✅");
    cargarAlumnos();
  } catch (err) {
    alert("❌ " + err.message);
  }
}

// Editar alumno (JSON en vez de FormData)
async function editarAlumno(id) {
  const nombre = prompt("Nuevo nombre:");
  const edad = prompt("Nueva edad:");
  const salon = prompt("Nuevo salón:");

  if (!nombre || !edad || !salon) {
    alert("Todos los campos son obligatorios ❌");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, edad, salon })
    });

    if (!res.ok) throw new Error("Error al actualizar alumno");
    alert("Alumno actualizado ✏️✅");
    cargarAlumnos();
  } catch (err) {
    alert("❌ " + err.message);
  }
}


document.getElementById("btnLeer").addEventListener("click", cargarAlumnos);

document.getElementById("btnActualizar").addEventListener("click", () => {
  const id = prompt("ID del alumno a actualizar:");
  if (id) editarAlumno(id);
});

document.getElementById("btnEliminar").addEventListener("click", () => {
  const id = prompt("ID del alumno a eliminar:");
  if (id) eliminarAlumno(id);
});


// Inicializar
cargarAlumnos();

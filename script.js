const API_URL = "https://alumnos-4j.onrender.com/alumnos";

// Registrar alumno
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
    cargarAlumnos(); // refresca la lista automáticamente
  } catch (err) {
    alert("❌ " + err.message);
  }
});

// Leer alumnos
document.getElementById("btnLeer").addEventListener("click", cargarAlumnos);

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
        <img src="${alumno.foto || "https://via.placeholder.com/150"}" alt="Foto">
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

// Eliminar alumno directamente
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

// Editar alumno directamente
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

// Inicializar lista al cargar la página
cargarAlumnos();

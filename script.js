const API_URL = "https://tu-backend-en-render.onrender.com/alumnos"; // Cambia por tu URL real

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
      <button onclick="eliminarAlumno('${alumno._id}')">🗑️ Eliminar</button>
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

// Inicializar
cargarAlumnos();

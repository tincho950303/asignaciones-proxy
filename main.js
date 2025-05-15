document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault();

  const legajo = document.getElementById("legajo").value;
  const regex = /^\d+$/;
  if (!regex.test(legajo)) {
    alert("Por favor ingresá solo números en el legajo.");
    return;
  }

  const servidor = `https://asignaciones-proxy-production.up.railway.app/legajo/${legajo}`;

  fetch(servidor)
    .then((response) => {
      if (!response.ok) {
        throw new Error("No se pudo obtener la información.");
      }
      return response.json();
    })
    .then((data) => {
      const listaAsignaciones = document.getElementById("asignaciones");
      listaAsignaciones.innerHTML = "";

      if (data.asignaciones && data.asignaciones.length > 0) {
        data.asignaciones.forEach((asignacion) => {
          const li = document.createElement("li");
          li.classList.add("fila-asignacion");

          li.innerHTML = `
    <span class="col-fecha">${asignacion.fecha}</span>
    <span class="col-hora">${asignacion.horaEntrada} a ${asignacion.horaSalida}</span>
    <span class="col-tienda">${asignacion.tienda}</span>
  `;

          listaAsignaciones.appendChild(li);
        });
      } else {
        listaAsignaciones.innerHTML = "<li>No hay asignaciones.</li>";
      }
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
      alert("Error al consultar las asignaciones.");
    });
});

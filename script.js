// Esperar que cargue el DOM y luego agregar el listener al formulario
document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.querySelector("form");
  const botonReset = document.querySelector(".limpiar");

  formulario.addEventListener("submit", cuenta);

  // Cuando se hace clic en "Borrar Todo", también se limpian los resultados
  botonReset.addEventListener("click", function () {
    document.getElementById("resultadoUno").textContent = "0";
    document.getElementById("resultadoDos").textContent = "0";
  });
});

function cuenta(event) {
  event.preventDefault(); // Evita que se recargue la página al enviar el form

  // Obtener los valores ingresados
  const monto = parseFloat(document.getElementById("ingCant").value);
  const plazo = parseInt(document.getElementById("ingAño").value);
  const tasa = parseFloat(document.getElementById("ingTasa").value);

  const tipoReembolso = document.querySelector(".input-radio-uno").checked;
  const tipoInteres = document.querySelector(".input-radio-dos").checked;

  // Validar
  if (!monto || !plazo || !tasa || (!tipoReembolso && !tipoInteres)) {
    alert("Por favor, completá todos los campos.");
    return;
  }

  const meses = plazo * 12;
  const tasaMensual = tasa / 100 / 12;

  let pagoMensual = 0;
  let totalReembolso = 0;

  if (tipoReembolso) {
    const factor = Math.pow(1 + tasaMensual, meses);
    pagoMensual = monto * (tasaMensual * factor) / (factor - 1);
    totalReembolso = pagoMensual * meses;
  } else if (tipoInteres) {
    pagoMensual = monto * tasaMensual;
    totalReembolso = pagoMensual * meses;
  }

  // Mostrar resultados con dos decimales
  document.getElementById("resultadoUno").textContent = pagoMensual.toFixed(2);
  document.getElementById("resultadoDos").textContent = totalReembolso.toFixed(2);
}
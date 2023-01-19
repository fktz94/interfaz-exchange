/// <reference types="jquery" />

const fechaMaximaAElegir = document.getElementById("calendario");
fechaMaximaAElegir.max = new Date().toISOString().split("T")[0];

//

const LINK = "https://api.frankfurter.app";

fetch(`${LINK}/currencies`)
  .then((respuesta) => respuesta.json())
  .then((respuestaJSON) => {
    const $selector = $("#menu-selector-divisas");
    Object.keys(respuestaJSON).forEach((moneda) => {
      $selector.append($(`<option value="${moneda}">${moneda}<option/>`));
      referencias += ``;
      $("#referencias span").append(
        ` <strong class="text-lg">${moneda}:</strong> ${respuestaJSON[moneda]}; `
      );
    });
  })
  .catch((error) => console.log(error));

// La function que sigue es la manera que encontré de eliminar los Options vacios que me genera el fetch de las divisas
// Entiendo que no es una buena práctica porque dependo del tiempo de conexión (por el setTimeout)

function vaciarOptionsVacias() {
  const $divisas = $("#menu-selector-divisas option");
  $divisas.each((i, divisa) => {
    if (divisa.innerText.length === 0) {
      divisa.remove();
    }
  });
}
setTimeout(vaciarOptionsVacias, 500);

//

function mostrarCuadroComparativoActual() {
  if ($("#lista-de-conversiones li").length > 0) {
    $("#lista-de-conversiones li").each((i, li) => li.remove());
  }

  const $divisaElegida = $("#menu-selector-divisas").val();
  fetch(`${LINK}/latest?from=${$divisaElegida}`)
    .then((respuesta) => respuesta.json())
    .then((respuestaJSON) => {
      $("#tablero-de-conversiones h3").text(
        `El valor del ${$divisaElegida} actual es:`
      );
      Object.keys(respuestaJSON.rates).forEach((valor) => {
        $("#lista-de-conversiones").append(
          $(
            `<li class="text-blue-900 mt-4"><strong>${valor}:</strong> ${respuestaJSON.rates[valor]}<li/>`
          )
        );
      });
    });
  setTimeout(vaciarLisVacias, 500);
}

const $valorHoy = $("#valor-hoy");
$valorHoy.on("click", mostrarCuadroComparativoActual);

// Mismo problema que con las options
function vaciarLisVacias() {
  const $divisas = $("#lista-de-conversiones li");
  $divisas.each((i, divisa) => {
    if (divisa.innerText.length === 0) {
      divisa.remove();
    }
  });
}
setTimeout(vaciarLisVacias, 500);
//

function mostrarCuadroComparativoPorCalendario() {
  if ($("#lista-de-conversiones li").length > 0) {
    $("#lista-de-conversiones li").each((i, li) => li.remove());
  }

  const $fechaElegida = $("#calendario").val();

  console.log();
  const $divisaElegida = $("#menu-selector-divisas").val();

  fetch(`${LINK}/${$fechaElegida}?from=${$divisaElegida}`)
    .then((respuesta) => respuesta.json())
    .then((respuestaJSON) => {
      $("#tablero-de-conversiones h3").text(
        `El valor del ${$divisaElegida} el día ${$fechaElegida
          .split("-")
          .reverse()
          .toString()
          .replaceAll(",", "/")} fue de:`
      );

      Object.keys(respuestaJSON.rates).forEach((valor) => {
        $("#lista-de-conversiones").append(
          $(
            `<li class="text-blue-900 mt-4"><strong>${valor}:</strong> ${respuestaJSON.rates[valor]}<li/>`
          )
        );
      });
      setTimeout(vaciarLisVacias, 500);
    });
}

const $valorCalendario = $("#buscar-por-fecha");
$valorCalendario.on("click", mostrarCuadroComparativoPorCalendario);

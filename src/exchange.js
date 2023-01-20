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

// La function que sigue es la manera que encontré de eliminar los Options vacios que me genera el fetch de las divisas (entre cada una agregada me deja una vacía)

// Creería que no es una buena práctica porque dependo del tiempo de conexión (por el setTimeout)

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
        `El valor del ${$divisaElegida} actual es de:`
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
  const $divisaElegida = $("#menu-selector-divisas").val();
  const $titulo = $("#tablero-de-conversiones h3");

  if (validarCalendario($fechaElegida, $titulo)) {
    fetch(`${LINK}/${$fechaElegida}?from=${$divisaElegida}`)
      .then((respuesta) => respuesta.json())
      .then((respuestaJSON) => {
        $titulo.text(
          `El valor del "${$divisaElegida}" el día ${$fechaElegida
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
}

const $valorCalendario = $("#buscar-por-fecha");
$valorCalendario.on("click", mostrarCuadroComparativoPorCalendario);

function validarCalendario(calendario, titulo) {
  const fechaElegida = new Date(calendario);
  const fechaActual = new Date();
  const fechaMinima = new Date("1999", "01", "04");
  console.log(isNaN(fechaElegida));
  if (fechaElegida < fechaMinima) {
    $("#calendario").addClass("error");
    if (titulo) {
      titulo.text("");
    }
    return false;
  } else if (isNaN(fechaElegida)) {
    $("#calendario").addClass("error");
    if (titulo) {
      titulo.text("");
    }
    return false;
  } else if (fechaElegida > fechaActual) {
    $("#calendario").addClass("error");
    if (titulo) {
      titulo.text("");
    }
    return false;
  } else {
    if ($("#calendario").hasClass("error")) {
      $("#calendario").removeClass("error");
    }
  }
  return true;
}

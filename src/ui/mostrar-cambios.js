/// <reference types="jquery" />

// Mismo problema que con las option en las currencies

function vaciarLisVacias() {
  const $divisas = $('#lista-de-conversiones ul li');
  $divisas.each((i, divisa) => {
    if (divisa.innerText.length === 0) {
      divisa.remove();
    }
  });
}

//

export function borrarErrorCalendario() {
  if ($('#calendario').hasClass('error')) {
    $('#calendario').removeClass('error');
  }
}

export function limpiarListadoDeConversiones() {
  if ($('#lista-de-conversiones li').length > 0) {
    $('#lista-de-conversiones li').each((i, li) => li.remove());
  }
}

export function escribirTitulo(texto) {
  const $titulo = $('#tablero-de-conversiones h3');
  $titulo.text(texto);
}

export function textoCargando(texto) {
  const $listadoDeConversiones = $('#lista-de-conversiones span');
  $listadoDeConversiones[0].innerHTML = texto;
}

export function obtenerDivisaElegida() {
  const $divisaElegida = $('#menu-selector-divisas').val();
  return $divisaElegida;
}

export function listarCambios(divisaElegida, actualizarCalendario) {
  const { base: moneda, rates: cambios, date: fecha } = divisaElegida;

  if (actualizarCalendario === fecha) {
    escribirTitulo(`El valor del '${moneda}' actual es de:`);
  } else {
    escribirTitulo(
      `El valor del '${moneda}' el día ${fecha
        .split('-')
        .reverse()
        .toString()
        .replaceAll(',', '/')} fue de:`,
    );
  }

  textoCargando('');

  const CANTIDAD_DE_MONEDAS = Object.keys(cambios).length;
  const $listadoDeConversiones = $('#lista-de-conversiones-1');

  Object.keys(cambios).forEach((valor) => {
    const cambio = `<li class="mt-4 text-left text-blue-900"><strong>${valor}:</strong> ${cambios[valor]}<li/>`;
    if ($listadoDeConversiones[0].childElementCount < CANTIDAD_DE_MONEDAS) {
      $('#lista-de-conversiones-1').append(cambio);
    } else {
      $('#lista-de-conversiones-2').append(cambio);
    }
  });

  vaciarLisVacias();
}

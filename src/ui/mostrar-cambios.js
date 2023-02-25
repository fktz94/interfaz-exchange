/// <reference types="jquery" />

import { actualizarCalendario } from './validar-calendario.js';

function vaciarLisVacias() {
  const $divisas = $('#lista-de-conversiones li');
  $divisas.each((i, divisa) => {
    if (divisa.innerText.length === 0) {
      divisa.remove();
    }
  });
}

export function limpiarListadoDeConversiones() {
  if ($('#lista-de-conversiones li').length > 0) {
    $('#lista-de-conversiones li').each((i, li) => li.remove());
  }
}

function borrarErrorCalendario() {
  if ($('#calendario').hasClass('error')) {
    $('#calendario').removeClass('error');
  }
}

export function escribirTitulo(texto) {
  const $titulo = $('#tablero-de-conversiones h3');
  $titulo.text(texto);
}

export function obtenerDivisaElegida() {
  const $divisaElegida = $('#menu-selector-divisas').val();
  return $divisaElegida;
}

export function listarCambiosDeHoy(divisaElegida) {
  const { base, rates, date } = divisaElegida;
  if (actualizarCalendario() === date) {
    borrarErrorCalendario();
    escribirTitulo(`El valor del '${base}' actual es de:`);
  } else {
    escribirTitulo(
      `El valor del '${base}' el día ${date
        .split('-')
        .reverse()
        .toString()
        .replaceAll(',', '/')} fue de:`,
    );
  }
  Object.keys(rates).forEach((valor) => {
    $('#lista-de-conversiones').append(
      `<li class="mt-4 text-left text-blue-900"><strong>${valor}:</strong> ${rates[valor]}<li/>`,
    );
  });

  vaciarLisVacias();
}

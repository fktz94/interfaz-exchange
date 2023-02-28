/// <reference types="jquery" />

export function actualizarCalendario() {
  const $calendario = $('#calendario');
  const [fechaActual] = new Date().toISOString().split('T');
  $calendario.max = fechaActual;
  return fechaActual;
}

export function validarCalendario(calendario, escribirTitulo, textoCargando) {
  const fechaElegida = new Date(calendario);
  const fechaActual = new Date();
  const fechaMinima = new Date('1999', '01', '04');

  if (
    fechaElegida < fechaMinima ||
    fechaElegida > fechaActual ||
    // No encontré otra manera de solucionar lo que sigue sin el disable de eslint:
    // eslint-disable-next-line no-restricted-globals
    isNaN(fechaElegida)
  ) {
    $('#calendario').addClass('error');
    escribirTitulo('');
    textoCargando('');
    return false;
  }
  if ($('#calendario').hasClass('error')) {
    $('#calendario').removeClass('error');
  }
  return true;
}

export function obtenerFechaElegida() {
  const fechaElegida = $('#calendario').val();
  return fechaElegida;
}

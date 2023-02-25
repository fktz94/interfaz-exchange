/// <reference types="jquery" />

export function actualizarCalendario() {
  const $calendario = $('#calendario');
  const [fechaActual] = new Date().toISOString().split('T');
  $calendario.max = fechaActual;
  return fechaActual;
}

export function validarCalendario(calendario, escribirTitulo) {
  const fechaElegida = new Date(calendario);
  const fechaActual = new Date();
  const fechaMinima = new Date('1999', '01', '04');

  if (
    fechaElegida < fechaMinima ||
    fechaElegida > fechaActual ||
    isNaN(fechaElegida)
  ) {
    $('#calendario').addClass('error');
    escribirTitulo('');
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

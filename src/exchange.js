import listarMonedas from './ui/listado-monedas.js';
import { cargarCambios, cargarMonedas } from './servicios/exchange.js';
import {
  obtenerDivisaElegida,
  listarCambios,
  escribirTitulo,
  limpiarListadoDeConversiones,
  textoCargando,
  borrarErrorCalendario,
} from './ui/mostrar-cambios.js';
import {
  actualizarCalendario,
  validarCalendario,
  obtenerFechaElegida,
} from './ui/calendario.js';

async function obtenerCambios(
  divisaElegida,
  fechaElegida = actualizarCalendario(),
) {
  limpiarListadoDeConversiones();
  if (fechaElegida === 'latest') {
    const cambiosHoy = await cargarCambios(divisaElegida, fechaElegida);
    listarCambios(cambiosHoy, actualizarCalendario());
  } else if (validarCalendario(fechaElegida, escribirTitulo, textoCargando)) {
    const cambiosHistoricos = await cargarCambios(divisaElegida, fechaElegida);
    listarCambios(cambiosHistoricos, actualizarCalendario());
  }
}

async function listarLasOpcionesDeMonedas() {
  const monedas = await cargarMonedas();
  listarMonedas(monedas);
}

function cargarPagina() {
  actualizarCalendario();
  listarLasOpcionesDeMonedas();

  const $botonBuscarHoy = $('#valor-hoy');
  const $botonBuscarPorFecha = $('#buscar-por-fecha');
  $botonBuscarHoy.on('click', () => {
    borrarErrorCalendario();
    textoCargando('Cargando...');
    obtenerCambios(obtenerDivisaElegida());
  });
  $botonBuscarPorFecha.on('click', () => {
    textoCargando('Cargando...');
    obtenerCambios(obtenerDivisaElegida(), obtenerFechaElegida());
  });
}

export default function iniciar() {
  cargarPagina();
}

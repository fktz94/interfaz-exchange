import listarMonedas from './ui/listado-monedas.js';
import { traerCambios, traerMonedas } from './llamar-api.js';
import {
  obtenerDivisaElegida,
  listarCambiosDeHoy,
  escribirTitulo,
  limpiarListadoDeConversiones,
} from './ui/mostrar-cambios.js';
import {
  actualizarCalendario,
  validarCalendario,
  obtenerFechaElegida,
} from './ui/validar-calendario.js';

async function listarLasOpcionesDeMonedas() {
  const monedas = await traerMonedas();
  listarMonedas(monedas);
}

// async function obtenerCambiosDeHoy(divisaElegida) {
//   const cambiosDeHoy = await traerCambios(divisaElegida);
//   listarCambiosDeHoy(cambiosDeHoy);
// }

async function obtenerCambios(divisaElegida, fechaElegida = 'latest') {
  limpiarListadoDeConversiones();
  if (fechaElegida === 'latest') {
    const cambiosHoy = await traerCambios(divisaElegida, fechaElegida);
    listarCambiosDeHoy(cambiosHoy);
  } else if (validarCalendario(fechaElegida, escribirTitulo)) {
    const cambiosHistoricos = await traerCambios(divisaElegida, fechaElegida);
    listarCambiosDeHoy(cambiosHistoricos);
  }
}

async function iniciar() {
  actualizarCalendario();
  listarLasOpcionesDeMonedas();
  const $botonBuscarHoy = $('#valor-hoy');
  const $botonBuscarPorFecha = $('#buscar-por-fecha');
  $botonBuscarHoy.on('click', () => {
    obtenerCambios(obtenerDivisaElegida());
  });
  $botonBuscarPorFecha.on('click', () =>
    obtenerCambios(obtenerDivisaElegida(), obtenerFechaElegida()),
  );
}

iniciar();

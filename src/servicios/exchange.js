import { traerCambios, traerMonedas } from '../api/api.js';
import {
  guardarCambioEnLaLocalStorage,
  guardarCurrenciesEnLaLocalStorage,
  obtenerCambioDeLaLocalStorage,
  obtenerCurrenciesDeLaLocalStorage,
} from '../storage/exchange.js';
import mapearCambios from '../mapeador/mapearCambios.js';

export async function cargarCambios(moneda, fecha) {
  try {
    return obtenerCambioDeLaLocalStorage(moneda, fecha);
  } catch (e) {
    const cambioData = await traerCambios(moneda, fecha);
    const cambio = mapearCambios(cambioData);
    guardarCambioEnLaLocalStorage(moneda, fecha, cambio);
    return cambio;
  }
}

export async function cargarMonedas() {
  try {
    return obtenerCurrenciesDeLaLocalStorage();
  } catch (e) {
    const currencies = await traerMonedas();
    guardarCurrenciesEnLaLocalStorage(currencies);
    return currencies;
  }
}

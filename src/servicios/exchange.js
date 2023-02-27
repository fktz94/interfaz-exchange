import { traerCambios, traerMonedas } from '../api/api.js';
import {
  guardarCambioEnLaLocalStorage,
  guardarCurrenciesEnLaLocalStorage,
  obtenerCambioDeLaLocalStorage,
  obtenerCurrenciesDeLaLocalStorage,
} from '../storage/exchange.js';

export async function cargarCambios(moneda, fecha) {
  try {
    return obtenerCambioDeLaLocalStorage(moneda, fecha);
  } catch (e) {
    const cambio = await traerCambios(moneda, fecha);
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

function obtenerId(moneda, fecha = 'latest') {
  return `${moneda}_${fecha}`;
}

export function obtenerCurrenciesDeLaLocalStorage() {
  const currencies = JSON.parse(localStorage.getItem(obtenerId('currencies')));
  if (currencies === null) {
    throw new Error(`Currencies no encontrado`);
  }
  return currencies;
}

export function guardarCurrenciesEnLaLocalStorage(currencies) {
  if (typeof currencies !== 'object') {
    throw new Error(
      'Se necesita que sea un objeto para guardarlo en la local storage',
    );
  }

  localStorage.setItem('currencies', JSON.stringify(currencies));
}

export function obtenerCambioDeLaLocalStorage(moneda, fecha) {
  if (moneda === undefined) {
    throw new Error(`Se necesita una moneda paraencontrar el cambio`);
  }

  const cambios = JSON.parse(localStorage.getItem(obtenerId(moneda, fecha)));
  if (cambios === null) {
    throw new Error(`Cambios de ${moneda} el dia ${fecha} no encontrado`);
  }
  return cambios;
}

export function guardarCambioEnLaLocalStorage(moneda, fecha, cambio) {
  if (
    moneda === undefined ||
    fecha === undefined ||
    typeof cambio !== 'object'
  ) {
    throw new Error(
      'Se necesita moneda, fecha y cambio para guardar en la local storage',
    );
  }

  localStorage.setItem(obtenerId(moneda, fecha), JSON.stringify(cambio));
}

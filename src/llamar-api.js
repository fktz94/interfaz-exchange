const LINK = 'https://api.frankfurter.app';

// agregar local server cache y try/catch

export async function traerMonedas() {
  return (await fetch(`${LINK}/currencies`)).json();
}

export async function traerCambios(moneda, fecha) {
  return (await fetch(`${LINK}/${fecha}?from=${moneda}`)).json();
}

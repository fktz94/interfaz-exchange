export const LINK = 'https://api.frankfurter.app';

export async function traerMonedas() {
  return (await fetch(`${LINK}/currencies`)).json();
}

export async function traerCambios(moneda, fecha) {
  if (moneda === undefined && fecha === undefined) {
    throw new Error('No se detectó moneda ni fecha');
  }
  return (await fetch(`${LINK}/${fecha}?from=${moneda}`)).json();
}

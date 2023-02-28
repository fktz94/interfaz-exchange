import Cambio from '../entidades/cambios.js';

export default function mapearCambios(dataApi) {
  const { base, date: fecha, rates } = dataApi;

  return new Cambio(base, fecha, rates);
}

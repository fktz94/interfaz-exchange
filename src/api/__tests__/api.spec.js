/// <reference types="Jest" />

import { traerCambios, traerMonedas, LINK } from '../api.js';

beforeEach(() => {
  global.fetch = jest.fn();
});

test('carga las monedas', () => {
  global.fetch.mockImplementationOnce(
    () =>
      new Promise((resolve) => {
        const jsonPromise = new Promise((r) => {
          r({});
        });
        resolve({ json: () => jsonPromise });
      }),
  );
  traerMonedas();
  expect(global.fetch).toHaveBeenCalledTimes(1);

  expect(global.fetch).toHaveBeenCalledWith(`${LINK}/currencies`);
});

test('carga los cambios con parametros de moneda y fecha', () => {
  global.fetch.mockImplementationOnce(
    () =>
      new Promise((resolve) => {
        const jsonPromise = new Promise((r) => {
          r({});
        });
        resolve({ json: () => jsonPromise });
      }),
  );
  traerCambios('ASD', '2022-10-10');
  expect(global.fetch).toHaveBeenCalledTimes(1);

  expect(global.fetch).toHaveBeenCalledWith(`${LINK}/2022-10-10?from=ASD`);
});

test('da error llamando a los cambios sin parametros', async () => {
  await expect(traerCambios()).rejects.toThrow('No se detectó moneda ni fecha');

  expect(global.fetch).toHaveBeenCalledTimes(0);
});
